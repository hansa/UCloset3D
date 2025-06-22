import { Component } from '@angular/core';
import { SaymotionService } from '../../services/saymotion.service';

@Component({
  selector: 'app-metahuman-video',
  templateUrl: './metahuman-video.component.html',
  styleUrls: ['./metahuman-video.component.scss']
})
export class MetahumanVideoComponent {
  selectedFile?: File;
  jobId?: string;
  loading = false;
  error?: string;

  constructor(private saymotion: SaymotionService) {}

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

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

  async animate() {
    if (!this.selectedFile) {
      this.error = 'Please select a video.';
      return;
    }
    this.loading = true;
    this.error = undefined;
    this.jobId = undefined;
    try {
      const res = await this.saymotion.animateVideo(this.selectedFile);
      this.jobId = res.rid;
    } catch {
      this.error = 'Failed to submit video.';
    } finally {
      this.loading = false;
    }
  }
}
