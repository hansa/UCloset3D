import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class AvatarService {
  private generatedUrl?: string;

  constructor(private http: HttpClient) {}

  async createAvatar(file: File): Promise<string> {
    // Prefer the optional open-source avatar API when configured
    if (environment.openAvatarApiUrl) {
      const formData = new FormData();
      formData.append('photo', file);
      try {
        const blob = await firstValueFrom(
          this.http.post(
            `${environment.openAvatarApiUrl}/generate-avatar`,
            formData,
            { responseType: 'blob' }
          )
        );
        this.generatedUrl = URL.createObjectURL(blob);
        return this.generatedUrl;
      } catch (err) {
        console.error('Failed to generate avatar from open-source API', err);
        return 'assets/avatar-default.glb';
      }
    }

    if (
      !environment.readyPlayerMeApiKey ||
      environment.readyPlayerMeApiKey.includes('YOUR_READY_PLAYER_ME_API_KEY')
    ) {
      console.warn('Ready Player Me API key not configured; using default avatar');
      return 'assets/avatar-default.glb';
    }

    const formData = new FormData();
    formData.append('photo', file);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.readyPlayerMeApiKey}`
    });

    try {
      const response = await firstValueFrom(
        this.http.post<{ avatarUrl: string }>(
          'https://api.readyplayer.me/v1/avatars',
          formData,
          { headers }
        )
      );

      this.generatedUrl = response.avatarUrl;
      return response.avatarUrl;
    } catch (err) {
      console.error('Failed to generate avatar from Ready Player Me', err);
      return 'assets/avatar-default.glb';
    }
  }

  async getAvatarUrl(): Promise<string> {
    if (this.generatedUrl) {
      return this.generatedUrl;
    }

    // Return a demo avatar stored in assets when no avatar has been generated
    return 'assets/avatar-default.glb';
  }
}
