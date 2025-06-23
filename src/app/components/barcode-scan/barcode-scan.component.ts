import { Component } from '@angular/core';
import { BarcodeService } from '../../services/barcode.service';

@Component({
  selector: 'app-barcode-scan',
  templateUrl: './barcode-scan.component.html',
  styleUrls: ['./barcode-scan.component.scss']
})
export class BarcodeScanComponent {
  selectedFile?: File;
  result?: string;
  error?: string;
  loading = false;

  constructor(private barcodeService: BarcodeService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  async scan() {
    if (!this.selectedFile) {
      return;
    }
    this.loading = true;
    this.error = undefined;
    try {
      this.result = await this.barcodeService.decodeBarcode(this.selectedFile);
    } catch {
      this.error = 'Failed to decode barcode.';
    } finally {
      this.loading = false;
    }
  }
}
