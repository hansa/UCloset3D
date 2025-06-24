import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

interface Look {
  id: string;
  lookImage: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  looks: Look[] = [];
  error?: string;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.loadLooks();
  }

  async loadLooks(): Promise<void> {
    try {
      this.error = undefined;
      this.looks = await this.firebaseService.getSavedLooks();
    } catch {
      this.error = 'Failed to load looks.';
    }
  }

  share(look: Look): void {
    const url = encodeURIComponent(look.lookImage);
    window.open(`https://www.instagram.com/?url=${url}`, '_blank');
  }
}
