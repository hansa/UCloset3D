import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AvatarService {
  private generatedUrl?: string;

  constructor() {}

  async createAvatar(file: File): Promise<string> {
    // In the demo environment we do not call an external API.
    // Instead, we simply return a local placeholder avatar so the
    // application can run without network access.
    this.generatedUrl = 'assets/avatar-default.glb';
    return this.generatedUrl;
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
