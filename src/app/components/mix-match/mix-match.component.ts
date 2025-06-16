import { Component, OnInit } from '@angular/core';
import { OutfitService } from '../../services/outfit.service';

@Component({
  selector: 'app-mix-match',
  templateUrl: './mix-match.component.html',
  styleUrls: ['./mix-match.component.css']
})
export class MixMatchComponent implements OnInit {
  outfits: string[] = [];
  error?: string;
  wardrobe: { url: string; category: string }[] = [];

  constructor(private outfitService: OutfitService) {}

  ngOnInit(): void {
    this.loadOutfits();
    const data = localStorage.getItem('wardrobe');
    this.wardrobe = data ? JSON.parse(data) : [];
  }

  async loadOutfits(): Promise<void> {
    try {
      this.error = undefined;
      this.outfits = await this.outfitService.getOutfits();
    } catch {
      this.error = 'Failed to load outfits.';
    }
  }

  onDragStart(ev: DragEvent, item: any): void {
    ev.dataTransfer?.setData('text/plain', JSON.stringify(item));
  }
}
