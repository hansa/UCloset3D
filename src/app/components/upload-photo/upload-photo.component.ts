import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RemoveBgService } from '../../services/removebg.service';
import { AvatarService } from '../../services/avatar.service';

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
  loading = false;

  constructor(
    private avatarService: AvatarService,
  private removeBgService: RemoveBgService,
    private router: Router
  ) {}

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
      this.router.navigate(['/avatar-preview'], { state: { avatarUrl: this.processedUrl } });
//       await this.avatarService.createAvatar(this.selectedFile);
//       this.router.navigate(['/avatar']);

    } catch (err) {
      this.error = 'Failed to generate avatar.';
    } finally {
      this.loading = false;
    }
  }
}
