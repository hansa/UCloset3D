import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BarcodeService {
  constructor(private http: HttpClient) {}

  async decodeBarcode(image: File): Promise<string> {
    const form = new FormData();
    form.append('file', image);
    const result = await firstValueFrom(
      this.http.post<any[]>('https://api.qrserver.com/v1/read-qr-code/', form)
    );
    return result[0]?.symbol[0]?.data ?? '';
  }
}
