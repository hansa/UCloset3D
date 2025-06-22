import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AvatarService {
  constructor(private http: HttpClient) {}

  async getAvatarUrl(measurements?: any): Promise<string> {
    if (measurements) {
      // Send body measurements to Ready Player Me to create an avatar
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const resp = await firstValueFrom(
        this.http.post<any>('https://api.readyplayer.me/v1/avatars', { measurements }, { headers })
      );
      return resp.url;
    }

    // Fallback to a random DiceBear avatar
    const seed = Math.random().toString(36).substring(2);
    const endpoint = `https://api.dicebear.com/6.x/avataaars/svg?seed=${seed}`;
    const blob = await firstValueFrom(this.http.get(endpoint, { responseType: 'blob' }));
    return URL.createObjectURL(blob);
  }
}
