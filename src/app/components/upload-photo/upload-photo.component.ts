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

  constructor(private removeBgService: RemoveBgService) {}

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files && element.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  async removeBackground() {
    if (!this.selectedFile) return;
    this.processedUrl = await this.removeBgService.removeBackground(this.selectedFile);
  }
}
