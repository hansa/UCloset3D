import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RemoveBgService {
  constructor(private http: HttpClient) {}

  async removeBackground(file: File): Promise<string> {
    // Placeholder: call Remove.bg API
    // For demo, return local URL
    return URL.createObjectURL(file);
  }
}
