import { Component } from '@angular/core';
import { ClothingType } from '../../models/fashion.models';
import { RemoveBgService } from '../../services/removebg.service';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-outfits',
  templateUrl: './upload-outfits.component.html',
  styleUrls: ['./upload-outfits.component.scss']
})

export class UploadOutfitsComponent {
  categories = Object.values(ClothingType);
  selectedCategory = this.categories[0];
  selectedFiles: File[] = [];
  uploadedUrls: string[] = [];
  isUploading = false;
  error?: string;

  constructor(
    private removeBgService: RemoveBgService,
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) {
      this.selectedFiles = Array.from(files);
    }
  }

  onFilesSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.selectedFiles = Array.from(files);
    }
  }

  async uploadAll() {
    if (!this.selectedFiles.length) {
      this.error = 'Please select images.';
      return;
    }
    this.error = undefined;
    this.isUploading = true;
    this.uploadedUrls = [];
    for (const file of this.selectedFiles) {
      try {
        await this.removeBgService.removeBackground(file);
        const url = await this.firebaseService.uploadFile(file);
        await this.firebaseService.saveOutfit({
          category: this.selectedCategory,
          imageUrl: url
        });
        this.uploadedUrls.push(url);
      } catch {
        this.error = 'Failed to upload files.';
        break;
      }
    }
    this.isUploading = false;
    if (!this.error) {
      this.router.navigate(['/try-on']);
    }
  }
}
