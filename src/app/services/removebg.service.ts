import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RemoveBgService {
  constructor(private http: HttpClient) {}

  async removeBackground(file: File): Promise<string> {
    if (
      !environment.removeBgApiKey ||
      environment.removeBgApiKey.includes('YOUR_REMOVE_BG_API_KEY')
    ) {
      console.warn('Remove.bg API key not configured; returning original image');
      return URL.createObjectURL(file);
    }

    const formData = new FormData();
    formData.append('image_file', file);

    const headers = new HttpHeaders({
      'X-Api-Key': environment.removeBgApiKey
    });

    try {
      const response = await firstValueFrom(
        this.http.post('https://api.remove.bg/v1.0/removebg', formData, {
          headers,
          responseType: 'blob'
        })
      );

      return URL.createObjectURL(response);
    } catch (err) {
      console.error('Failed to remove background via API', err);
      return URL.createObjectURL(file);
    }
  }
}
