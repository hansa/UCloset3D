import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DeepMotionService {
  constructor(private http: HttpClient) {}

  async animateVideo(video: File, avatarUrl?: string): Promise<string> {
    if (!environment.deepMotionApiKey || environment.deepMotionApiKey.includes('YOUR_DEEPMOTION_API_KEY')) {
      console.warn('DeepMotion API key not configured; returning original video');
      return URL.createObjectURL(video);
    }

    const formData = new FormData();
    formData.append('file', video);
    if (avatarUrl) {
      formData.append('avatarUrl', avatarUrl);
    }

    const headers = new HttpHeaders({
      'x-api-key': environment.deepMotionApiKey
    });

    try {
      const response = await firstValueFrom(
        this.http.post<{ url: string }>(
          environment.deepMotionApiUrl,
          formData,
          { headers }
        )
      );
      return response.url;
    } catch (err) {
      console.error('Failed to animate video via DeepMotion', err);
      return URL.createObjectURL(video);
    }
  }
}
