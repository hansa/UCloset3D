import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FashnService {
  constructor(private http: HttpClient) {}

  async tryOn(modelImage: string, garmentImage: string, category: string): Promise<any> {
    const { fashnApiKey, fashnApiUrl } = environment;
    if (!fashnApiKey || fashnApiKey.includes('YOUR_FASHN_API_KEY')) {
      throw new Error('Fashn API key not configured');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${fashnApiKey}`,
    });

    const runResp = await firstValueFrom(
      this.http.post<{ id: string }>(`${fashnApiUrl}/run`,
        { model_image: modelImage, garment_image: garmentImage, category },
        { headers }
      )
    );

    while (true) {
      const status = await firstValueFrom(
        this.http.get<any>(`${fashnApiUrl}/status/${runResp.id}`, { headers })
      );
      if (status.status === 'completed') {
        return status.output;
      } else if (['starting', 'in_queue', 'processing'].includes(status.status)) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      } else {
        throw new Error(status.error || 'Prediction failed');
      }
    }
  }
}
