import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AwesomeVtonService {
  constructor(private http: HttpClient) {}

  async tryOnFiles(model: File, garment: File, category = 'tops'): Promise<string> {
    if (!environment.awesomeVtonApiUrl) {
      throw new Error('Awesome VTON API not configured');
    }
    const formData = new FormData();
    formData.append('model', model);
    formData.append('garment', garment);
    formData.append('category', category);
    const resp = await firstValueFrom(
      this.http.post<{ output_url: string }>(`${environment.awesomeVtonApiUrl}/tryon`, formData)
    );
    return resp.output_url;
  }
}
