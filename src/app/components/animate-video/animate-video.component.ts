import { Component } from '@angular/core';
import { DeepMotionService } from '../../services/deepmotion.service';

@Component({
  selector: 'app-animate-video',
  templateUrl: './animate-video.component.html',
  styleUrls: ['./animate-video.component.scss']
})
export class AnimateVideoComponent {
  selectedFile?: File;
  animationUrl?: string;
  error?: string;
  loading = false;

  constructor(private deepMotion: DeepMotionService) {}

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
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  async animate() {
    if (!this.selectedFile) {
      this.error = 'Please select a video.';
      return;
    }
    this.loading = true;
    try {
      this.error = undefined;
      this.animationUrl = await this.deepMotion.animateVideo(this.selectedFile);
    } catch {
      this.error = 'Failed to animate video.';
    } finally {
      this.loading = false;
    }
  }
}
