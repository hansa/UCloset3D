
import { Component, OnInit } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { AvatarService } from '../../services/avatar.service';
import { FirebaseService } from '../../services/firebase.service';
import { OutfitGeneratorService } from '../../services/outfit-generator.service';
import { FashnService } from '../../services/fashn.service';
import { Router } from '@angular/router';
import { ClosetItem } from '../../models/closet-item';
import { DEFAULT_OUTFITS } from '../../models/default-outfits';

const LAYER_ORDER: Record<string, number> = {
  shoes: 10,
  pants: 20,
  skirt: 20,
  dress: 30,
  top: 40,
  shirt: 40,
  jacket: 50,
  outerwear: 50,
  accessory: 60,
};


@Component({
  selector: 'app-virtual-closet',
  templateUrl: './virtual-closet.component.html',
  styleUrls: ['./virtual-closet.component.scss']
})

export class VirtualClosetComponent implements OnInit {
  avatarUrl?: string | null;
  pieces: ClosetItem[] = [];
  saving = false;
  message?: string;
  previewUrl?: string;

  private assignLayers(items: ClosetItem[]): ClosetItem[] {
    return items.map(i => ({
      ...i,
      layer: LAYER_ORDER[i.category || ''] || 0,
    }));
  }

  constructor(
    private avatarService: AvatarService,
    private firebaseService: FirebaseService,
    private outfitGenerator: OutfitGeneratorService,
    private fashn: FashnService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadAvatar();
    await this.loadPieces();
  }

  async loadAvatar() {
    this.avatarUrl = await this.avatarService.getAvatarUrl();
  }

  async loadPieces(): Promise<void> {
    try {
      const outfits = await this.firebaseService.getOutfits();
      const items = outfits.length
        ? outfits.map((o, idx) => ({
            url: o.imageUrl,
            category: o.category,
            x: (idx - outfits.length / 2) * 120,
            y: 0,
          }))
        : DEFAULT_OUTFITS.map((o, idx) => ({
            ...o,
            x: (idx - DEFAULT_OUTFITS.length / 2) * 120,
            y: 0,
          }));
      this.pieces = this.assignLayers(items);
    } catch {
      this.message = 'Failed to load outfits. Using defaults.';
      this.pieces = this.assignLayers(
        DEFAULT_OUTFITS.map((o, idx) => ({
          ...o,
          x: (idx - DEFAULT_OUTFITS.length / 2) * 120,
          y: 0,
        }))
      );
    }
  }

  async generate(): Promise<void> {
    this.message = undefined;
    try {
      this.pieces = this.assignLayers(
        await this.outfitGenerator.generateRandomOutfit()
      );
    } catch {
      this.message = 'Failed to generate outfit.';
    }
  }

  onDragEnd(event: CdkDragEnd, piece: ClosetItem) {
    const pos = event.source.getFreeDragPosition();
    piece.x = pos.x;
    piece.y = pos.y;
  }

  async preview(piece: ClosetItem) {
    if (!this.avatarUrl) {
      this.message = 'No avatar available for try-on.';
      return;
    }
    this.message = 'Generating preview...';
    try {
      this.previewUrl = await this.fashn.tryOn(
        this.avatarUrl,
        piece.url,
        piece.category || 'top'
      );
      this.message = undefined;
    } catch {
      this.message = 'Virtual try-on failed.';
    }
  }

  async save() {
    this.saving = true;
    this.message = undefined;
    try {
      await this.firebaseService.saveOutfit({
        avatar: this.avatarUrl,
        pieces: this.pieces
      });
      this.message = 'Outfit saved.';
      // Navigate to the gallery so the user can view their outfits
      this.router.navigate(['/outfit-gallery']);
    } catch {
      this.message = 'Save failed.';
    } finally {
      this.saving = false;
    }
  }
}

