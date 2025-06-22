import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { ClosetItem } from '../models/closet-item';
import { DEFAULT_OUTFITS } from '../models/default-outfits';

@Injectable({ providedIn: 'root' })
export class OutfitGeneratorService {
  constructor(private firebaseService: FirebaseService) {}

  async generateRandomOutfit(): Promise<ClosetItem[]> {
    const items = await this.firebaseService.getOutfits();
    if (!items.length) {
      return DEFAULT_OUTFITS.map(o => ({ ...o, x: 0, y: 0 }));
    }
    const categories: Record<string, ClosetItem[]> = {};

    for (const item of items) {
      const cat = item.category || 'misc';
      if (!categories[cat]) {
        categories[cat] = [];
      }
      categories[cat].push({ url: item.imageUrl, category: cat });
    }

    const outfit: ClosetItem[] = [];
    for (const cat of Object.keys(categories)) {
      const list = categories[cat];
      const randomItem = list[Math.floor(Math.random() * list.length)];
      outfit.push({ ...randomItem, x: 0, y: 0 });
    }

    return outfit;
  }
}
