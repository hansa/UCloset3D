import { Component } from '@angular/core';
import { AwesomeVtonService } from '../../services/awesome-vton.service';

interface FileSelection {
  file?: File;
  preview?: string;
}

@Component({
  selector: 'app-mix-match',
  templateUrl: './mix-match.component.html',
  styleUrls: ['./mix-match.component.scss']
})
export class MixMatchComponent {
  outfits: string[] = ['Hat', 'Top', 'Shirt', 'Pants', 'Skirt', 'Shoes'];
  model: FileSelection = {};
  garment: FileSelection = {};
  resultUrl?: string;
  loading = false;
  error?: string;

  constructor(private awesome: AwesomeVtonService) {}

  onFileSelected(event: any, type: 'model' | 'garment') {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    if (type === 'model') {
      this.model = { file, preview };
    } else {
      this.garment = { file, preview };
    }
  }

  async tryOn() {
    if (!this.model.file || !this.garment.file) {
      this.error = 'Please select both images.';
      return;
    }
    this.loading = true;
    this.error = undefined;
    try {
      this.resultUrl = await this.awesome.tryOnFiles(
        this.model.file,
        this.garment.file,
        'tops'
      );
    } catch {
      this.error = 'Try-on failed.';
    } finally {
      this.loading = false;
    }
  }
}
