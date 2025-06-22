import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BodyBlockService {
  constructor(private http: HttpClient) {}

  async measure(file: File): Promise<any> {
    // Use the optional open-source avatar API when configured
    if (environment.openAvatarApiUrl) {
      const formData = new FormData();
      formData.append('photo', file);
      try {
        return await firstValueFrom(
          this.http.post<any>(
            `${environment.openAvatarApiUrl}/measurements`,
            formData
          )
        );
      } catch (err) {
        console.error('Failed to fetch measurements from open-source API', err);
        return { chest: 0, waist: 0, hip: 0 };
      }
    }

    if (
      !environment.bodyBlockApiKey ||
      environment.bodyBlockApiKey.includes('YOUR_BODYBLOCK_API_KEY')
    ) {
      console.warn('BodyBlock API key not configured; returning mock measurements');
      return {
        chest: 0,
        waist: 0,
        hip: 0
      };
    }

    const formData = new FormData();
    formData.append('image', file);

    const headers = new HttpHeaders({
      'X-Api-Key': environment.bodyBlockApiKey
    });

    try {
      return await firstValueFrom(
        this.http.post<any>('https://api.bodyblock.ai/v1/measurements', formData, {
          headers
        })
      );
    } catch (err) {
      console.error('Failed to fetch measurements from BodyBlock', err);
      return {
        chest: 0,
        waist: 0,
        hip: 0
      };
    }
  }
}
