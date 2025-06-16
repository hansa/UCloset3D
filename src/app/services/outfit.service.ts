import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OutfitService {
  constructor(private http: HttpClient) {}

  async getOutfits(): Promise<string[]> {
    const url = 'https://fakestoreapi.com/products/category/men\'s%20clothing';
    const items: any[] = await firstValueFrom(this.http.get<any[]>(url));
    return items.slice(0, 4).map(i => i.title);
  }
}
