import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RemoveBgService } from '../../services/removebg.service';
import { AvatarService } from '../../services/avatar.service';
import { BodyBlockService } from '../../services/bodyblock.service';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css']
})
export class UploadPhotoComponent {
  selectedFile?: File;
  error?: string;
  /**
   * Stores the URL returned from background removal so it can
   * be passed to the avatar preview component when navigating.
   */
  processedUrl?: string;
  measurements?: any;
  loading = false;

  constructor(
    private avatarService: AvatarService,
    private removeBgService: RemoveBgService,
    private bodyBlockService: BodyBlockService,
    private router: Router
  ) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length) {
      this.selectedFile = files[0];
    }
  }

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files && element.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  async generateAvatar() {
    if (!this.selectedFile) {
      this.error = 'Please select a file first.';
      return;
    }
    this.loading = true;
    try {
      this.error = undefined;
      this.processedUrl = await this.removeBgService.removeBackground(this.selectedFile);
      this.measurements = await this.bodyBlockService.measure(this.selectedFile);
      const avatarUrl = await this.avatarService.createAvatar(this.selectedFile);
      this.router.navigate(['/avatar-preview'], { state: { avatarUrl, measurement: this.measurements } });

    } catch (err) {
      this.error = 'Failed to generate avatar.';
    } finally {
      this.loading = false;
    }
  }
}
