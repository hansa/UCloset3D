import { Injectable } from '@angular/core';
import { ClothingItem, ClothingType, Color, Occasion } from '../models/fashion.models';

@Injectable({ providedIn: 'root' })
export class WardrobeService {
  private storageKey = 'wardrobe-items';

  private load(): ClothingItem[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private save(items: ClothingItem[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  getItems(): ClothingItem[] {
    return this.load();
  }

  addItem(item: ClothingItem): void {
    const items = this.load();
    item.id = Date.now();
    items.push(item);
    this.save(items);
  }

  removeItem(id: number): void {
    const items = this.load().filter(i => i.id !== id);
    this.save(items);
  }
}
