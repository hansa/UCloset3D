import { Component, OnInit } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { FirebaseService } from '../../services/firebase.service';
import { ClosetItem } from '../../models/closet-item';
import { DEFAULT_OUTFITS } from '../../models/default-outfits';

@Component({
  selector: 'app-model-dress-up',
  templateUrl: './model-dress-up.component.html',
  styleUrls: ['./model-dress-up.component.scss']
})
export class ModelDressUpComponent implements OnInit {
  baseImage = 'assets/model-silhouette.svg';
  pieces: ClosetItem[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.loadPieces();
  }

  async loadPieces(): Promise<void> {
    const outfits = await this.firebaseService.getOutfits();
    this.pieces = (outfits.length
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
        }))
    ).map(p => ({ ...p, layer: 10 }));
  }

  onDragEnd(event: CdkDragEnd, piece: ClosetItem) {
    const pos = event.source.getFreeDragPosition();
    piece.x = pos.x;
    piece.y = pos.y;
  }
}
