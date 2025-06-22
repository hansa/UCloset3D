import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BodyBlockService {
  constructor(private http: HttpClient) {}

  async measure(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('image', file);

    const headers = new HttpHeaders({
      'X-Api-Key': environment.bodyBlockApiKey
    });

    return firstValueFrom(
      this.http.post<any>('https://api.bodyblock.ai/v1/measurements', formData, {
        headers
      })
    );
  }
}
