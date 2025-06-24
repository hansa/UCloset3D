import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { ClosetItem } from '../models/closet-item';
import { DEFAULT_OUTFITS } from '../models/default-outfits';

@Injectable({ providedIn: 'root' })
export class MixMatchService {
  constructor(private firebaseService: FirebaseService) {}

  private groupByCategory(items: ClosetItem[]): Record<string, ClosetItem[]> {
    const grouped: Record<string, ClosetItem[]> = {};
    for (const item of items) {
      const cat = item.category || 'misc';
      if (!grouped[cat]) {
        grouped[cat] = [];
      }
      grouped[cat].push(item);
    }
    return grouped;
  }

  private cartesian(arrays: ClosetItem[][]): ClosetItem[][] {
    return arrays.reduce<ClosetItem[][]>((acc, curr) => {
      const result: ClosetItem[][] = [];
      for (const a of acc) {
        for (const b of curr) {
          result.push([...a, b]);
        }
      }
      return result;
    }, [[]]);
  }

  async generateOutfits(max = 10): Promise<ClosetItem[][]> {
    const items = await this.firebaseService.getOutfits();
    const source = items.length ? items.map(o => ({ url: o.imageUrl, category: o.category })) : DEFAULT_OUTFITS;
    const grouped = this.groupByCategory(source);
    const combos = this.cartesian(Object.values(grouped));
    return combos.slice(0, max);
  }
}
