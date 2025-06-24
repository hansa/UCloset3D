import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RemoveBgService } from '../../services/removebg.service';
import { AvatarService } from '../../services/avatar.service';
import { BodyBlockService } from '../../services/bodyblock.service';
import { PersonImageService } from '../../services/person-image.service';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss']
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
    private personImage: PersonImageService,
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
      this.personImage.setImage(this.selectedFile);
    }
  }

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files && element.files[0];
    if (file) {
      this.selectedFile = file;
      this.personImage.setImage(file);
    }
  }

  async generateAvatar() {
    if (!this.selectedFile) {
      // Allow the workflow to continue using a demo avatar
      this.error = undefined;
      const avatarUrl = 'assets/avatar-default.glb';
      this.router.navigate(['/avatar-preview'], {
        state: { avatarUrl, measurement: { chest: 0, waist: 0, hip: 0 } }
      });
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
      // Continue with a fallback avatar so the user can proceed
      this.error = 'Failed to fully generate avatar. Showing default.';
      const avatarUrl = 'assets/avatar-default.glb';
      this.router.navigate(['/avatar-preview'], { state: { avatarUrl, measurement: { chest: 0, waist: 0, hip: 0 } } });
    } finally {
      this.loading = false;
    }
  }
}
