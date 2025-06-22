import { Component } from '@angular/core';
import { RemoveBgService } from '../../services/removebg.service';
import { BodyMeasureService } from '../../services/body-measure.service';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css']
})
export class UploadPhotoComponent {
  selectedFile?: File;
  processedUrl?: string;
  error?: string;
  success?: string;
  loading = false;

  category = 'top';
  categories = ['top', 'bottom', 'shoes', 'skirt', 'dress', 'coat'];

  measurements?: any;

  constructor(
    private removeBgService: RemoveBgService,
    private bodyMeasureService: BodyMeasureService
  ) {}

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
      this.success = undefined;
      this.loading = true;
      this.processedUrl = await this.removeBgService.removeBackground(this.selectedFile);
      try {
        this.measurements = await this.bodyMeasureService.getMeasurements(this.selectedFile);
        localStorage.setItem('measurements', JSON.stringify(this.measurements));
      } catch {
        // Ignore measurement errors for now
      }
      if (this.processedUrl) {
        const items = JSON.parse(localStorage.getItem('wardrobe') || '[]');
        items.push({ url: this.processedUrl, category: this.category });
        localStorage.setItem('wardrobe', JSON.stringify(items));
        this.success = 'Image processed and saved to wardrobe.';
      }
    } catch {
      this.error = 'Failed to process image.';
    }
    this.loading = false;

  }
}
