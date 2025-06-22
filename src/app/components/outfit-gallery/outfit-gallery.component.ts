import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

interface Outfit {
  id: string;
  imageUrl: string;
  description?: string;
}

@Component({
  selector: 'app-outfit-gallery',
  templateUrl: './outfit-gallery.component.html',
  styleUrls: ['./outfit-gallery.component.css']
})
export class OutfitGalleryComponent implements OnInit {
  outfits: Outfit[] = [];
  error?: string;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.loadOutfits();
  }

  async loadOutfits(): Promise<void> {
    try {
      this.error = undefined;
      this.outfits = await this.firebaseService.getOutfits();
    } catch {
      this.error = 'Failed to load outfits.';
    }
  }

  onSelect(outfit: Outfit): void {
    // Placeholder for view/edit navigation
    console.log('Selected outfit', outfit);
  }

  share(outfit: Outfit): void {
    // Placeholder for share logic
    console.log('Share outfit', outfit);
  }
}
