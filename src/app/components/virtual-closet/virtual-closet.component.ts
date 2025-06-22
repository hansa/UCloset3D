
import { Component, OnInit } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { AvatarService } from '../../services/avatar.service';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

interface ClosetItem {
  url: string;
  x: number;
  y: number;
}


@Component({
  selector: 'app-virtual-closet',
  templateUrl: './virtual-closet.component.html',
  styleUrls: ['./virtual-closet.component.css']
})

export class VirtualClosetComponent implements OnInit {
  avatarUrl?: string | null;
  pieces: ClosetItem[] = [];
  saving = false;
  message?: string;

  constructor(
    private avatarService: AvatarService,
    private firebaseService: FirebaseService,
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
      this.pieces = outfits.map((o, idx) => ({
        url: o.imageUrl,
        x: (idx - outfits.length / 2) * 120,
        y: 0,
      }));
    } catch {
      this.message = 'Failed to load outfits.';
      this.pieces = [];
    }
  }

  onDragEnd(event: CdkDragEnd, piece: ClosetItem) {
    const pos = event.source.getFreeDragPosition();
    piece.x = pos.x;
    piece.y = pos.y;
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

