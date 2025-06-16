import { Component } from '@angular/core';
import { RemoveBgService } from '../../services/removebg.service';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css']
})
export class UploadPhotoComponent {
  selectedFile?: File;
  processedUrl?: string;
  error?: string;

  constructor(private removeBgService: RemoveBgService) {}

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files && element.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  async removeBackground() {
    if (!this.selectedFile) {
      this.error = 'Please select a file first.';
      return;
    }
    try {
      this.error = undefined;
      this.processedUrl = await this.removeBgService.removeBackground(this.selectedFile);
    } catch (err) {
      this.error = 'Failed to process image.';
    }
  }
}
