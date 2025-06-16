import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AvatarService {
  constructor(private http: HttpClient) {}

  async getAvatarUrl(): Promise<string> {
    // Placeholder: integrate with 3DLOOK or Ready Player Me
    // Return a demo avatar stored in assets
    return 'assets/avatar-default.glb';
  }
}
