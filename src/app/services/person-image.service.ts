import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class PersonImageService {
  private file?: File;
  setImage(file: File) { this.file = file; }
  getImage(): File | undefined { return this.file; }
}

