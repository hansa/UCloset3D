import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TryOnOptions {
  /** Processing mode such as "standard" or "high_fidelity" */
  mode?: string;
  /** Type of garment photo, e.g. "flat" or "model" */
  garment_photo_type?: string;
  /** Number of samples the API should generate */
  num_samples?: number;
  /** Seed for deterministic output */
  seed?: number;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class FashnService {
  constructor(private http: HttpClient) {}

  /**
   * Upload raw image files to the Fashn API for virtual try-on.
   * Returns the API response which typically includes an output_image_url.
   */
  async tryOnFiles(
    modelFile: File,
    garmentFile: File,
    category: string,
    options: Record<string, any> = {}
  ): Promise<any> {
    const { fashnApiKey, fashnApiUrl } = environment;
    if (!fashnApiKey || fashnApiKey.includes('YOUR_FASHN_API_KEY')) {
      throw new Error('Fashn API key not configured');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${fashnApiKey}`,
    });

    const formData = new FormData();
    formData.append('model_image', modelFile);
    formData.append('garment_image', garmentFile);
    formData.append('category', category);
    Object.entries(options).forEach(([k, v]) => formData.append(k, v as any));

    return firstValueFrom(
      this.http.post<any>(`${fashnApiUrl}/run`, formData, { headers })
    );
  }

  async tryOn(modelImage: string, garmentImage: string, category: string, options: TryOnOptions = {}): Promise<any> {
    const { fashnApiKey, fashnApiUrl } = environment;
    if (!fashnApiKey || fashnApiKey.includes('YOUR_FASHN_API_KEY')) {
      throw new Error('Fashn API key not configured');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${fashnApiKey}`,
    });

    const payload = {
      model_image: modelImage,
      garment_image: garmentImage,
      category,
      ...options,
    };

    const runResp = await firstValueFrom(
      this.http.post<{ id: string }>(`${fashnApiUrl}/run`, payload, { headers })
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
