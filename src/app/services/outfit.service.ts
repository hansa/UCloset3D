import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OutfitService {
  constructor(private http: HttpClient) {}

  async getOutfits(): Promise<{ title: string; image: string }[]> {
    const url = 'https://fakestoreapi.com/products/category/men\'s%20clothing';
    const items: any[] = await firstValueFrom(this.http.get<any[]>(url));
    return items.slice(0, 4).map(i => ({ title: i.title, image: i.image }));
  }
}
