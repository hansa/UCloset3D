import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AvatarService {
  private generatedUrl?: string;

  constructor(private http: HttpClient) {}

  async createAvatar(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('photo', file);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.threeDLookApiKey}`
    });

    const response = await firstValueFrom(
      this.http.post<{ avatarUrl: string }>(
        'https://api.3dlook.ai/v3/avatars',
        formData,
        { headers }
      )
    );

    this.generatedUrl = response.avatarUrl;
    return response.avatarUrl;
  }

  async getAvatarUrl(): Promise<string> {
    if (this.generatedUrl) {
      return this.generatedUrl;
    }

    // Placeholder: integrate with 3DLOOK or Ready Player Me
    // Return a demo avatar stored in assets
    return 'assets/avatar-default.glb';
  }
}
