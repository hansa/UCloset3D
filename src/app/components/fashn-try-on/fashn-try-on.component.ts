import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FashnService } from '../../services/fashn.service';
import { FirebaseService } from '../../services/firebase.service';
import { PersonImageService } from '../../services/person-image.service';

@Component({
  selector: 'app-fashn-try-on',
  templateUrl: './fashn-try-on.component.html',
  styleUrls: ['./fashn-try-on.component.scss']
})
export class FashnTryOnComponent implements OnInit {
  personImage?: File;
  garmentImage?: File;
  personPreview?: string;
  garmentPreview?: string;
  tryOnResult?: string;
  loading = false;
  error?: string;

  constructor(
    private fashn: FashnService,
    private firestore: FirebaseService,
    private personImageSvc: PersonImageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const file = this.personImageSvc.getImage();
    if (file) {
      this.personImage = file;
      this.personPreview = URL.createObjectURL(file);
    }
  }

  onFileSelected(event: any, type: 'person' | 'garment') {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    if (type === 'person') {
      this.personImage = file;
      this.personPreview = URL.createObjectURL(file);
    } else {
      this.garmentImage = file;
      this.garmentPreview = URL.createObjectURL(file);
    }
  }

  async tryOnClothing() {
    if (!this.personImage || !this.garmentImage) {
      this.error = 'Please select both images.';
      return;
    }
    this.error = undefined;
    this.loading = true;
    try {
      const res = await this.fashn.tryOnFiles(
        this.personImage,
        this.garmentImage,
        'tops'
      );
      this.tryOnResult = res.output_image_url || res.output;
      // Optional: save result
      await this.firestore.saveLook({
        userId: 'demo',
        lookImage: this.tryOnResult,
        timestamp: new Date()
      });
    } catch {
      this.error = 'Try-on failed.';
    } finally {
      this.loading = false;
    }
  }

  next(): void {
    this.router.navigate(['/virtual-closet']);
  }
}
