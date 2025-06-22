
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

  ngOnInit(): void {
    this.loadAvatar();
    // Demo outfit pieces
    this.pieces = [
      { url: 'assets/item1.png', x: -120, y: 0 },
      { url: 'assets/item2.png', x: 120, y: 0 }
    ];
  }

  async loadAvatar() {
    this.avatarUrl = await this.avatarService.getAvatarUrl();
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

