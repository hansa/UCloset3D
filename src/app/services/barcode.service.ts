import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BarcodeService {
  constructor(private http: HttpClient) {}

  async decodeBarcode(image: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', image);

    const headers = new HttpHeaders({
      Authorization: `Token ${environment.barcodeApiKey}`
    });

    const response = await firstValueFrom(
      this.http.post<{ code: string }>(
        'https://api.scandit.com/barcode/v1/recognize',
        formData,
        { headers }
      )
    );

    return response.code;
  }
}
