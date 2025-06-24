import { Component } from '@angular/core';
import { FashnService } from '../../services/fashn.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-fashn-try-on',
  templateUrl: './fashn-try-on.component.html',
  styleUrls: ['./fashn-try-on.component.scss']
})
export class FashnTryOnComponent {
  personImage?: File;
  garmentImage?: File;
  tryOnResult?: string;
  loading = false;
  error?: string;

  constructor(
    private fashn: FashnService,
    private firestore: FirebaseService
  ) {}

  onFileSelected(event: any, type: 'person' | 'garment') {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    if (type === 'person') {
      this.personImage = file;
    } else {
      this.garmentImage = file;
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
}
