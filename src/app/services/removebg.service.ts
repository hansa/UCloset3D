import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RemoveBgService {
  constructor(private http: HttpClient) {}

  private apiKey = 'REPLACE_WITH_REMOVEBG_KEY';

  async removeBackground(file: File): Promise<string> {
    const form = new FormData();
    form.append('image_file', file);
    const headers = new HttpHeaders({ 'X-Api-Key': this.apiKey });
    const blob = await firstValueFrom(
      this.http.post('https://api.remove.bg/v1.0/removebg', form, {
        headers,
        responseType: 'blob'
      })
    );
    return URL.createObjectURL(blob);
  }
}
