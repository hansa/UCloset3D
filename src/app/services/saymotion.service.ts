import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

interface JobResponse {
  rid: string;
}

@Injectable({ providedIn: 'root' })
export class SaymotionService {
  constructor(private http: HttpClient) {}

  private async authenticate(): Promise<string> {
    const { sayMotionClientId, sayMotionClientSecret, sayMotionBaseUrl } = environment;
    if (!sayMotionClientId || !sayMotionClientSecret || !sayMotionBaseUrl) {
      throw new Error('SayMotion credentials not configured');
    }
    const auth = btoa(`${sayMotionClientId}:${sayMotionClientSecret}`);
    const headers = new HttpHeaders({ Authorization: `Basic ${auth}` });
    const resp = await firstValueFrom(
      this.http.get(sayMotionBaseUrl + '/account/v1/auth', {
        observe: 'response',
        headers,
      })
    );
    const cookie = resp.headers.get('set-cookie');
    if (!cookie) {
      throw new Error('Missing session cookie');
    }
    const match = /dmsess=[^;]+/.exec(cookie);
    if (!match) {
      throw new Error('Invalid session cookie');
    }
    return match[0];
  }

  async generateMotion(prompt: string): Promise<JobResponse> {
    const cookie = await this.authenticate();
    const headers = new HttpHeaders({ Cookie: cookie });
    const body = {
      params: [`prompt=${prompt}`],
    };
    return await firstValueFrom(
      this.http.post<JobResponse>(
        `${environment.sayMotionBaseUrl}/job/v1/process/text2motion`,
        body,
        { headers }
      )
    );
  }
}
