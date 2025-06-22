import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BodyMeasureService {
  private apiKey = 'REPLACE_WITH_3DLOOK_KEY';

  constructor(private http: HttpClient) {}

  async getMeasurements(photo: File): Promise<any> {
    const form = new FormData();
    form.append('photo', photo);
    const headers = new HttpHeaders({ 'X-API-Key': this.apiKey });
    const response = await firstValueFrom(
      this.http.post<any>('https://api.3dlook.ai/v3/measurements', form, { headers })
    );
    return response.measurements;
  }
}
