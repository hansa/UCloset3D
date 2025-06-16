import { Component, OnInit } from '@angular/core';
import { AvatarService } from '../../services/avatar.service';

@Component({
  selector: 'app-avatar-view',
  templateUrl: './avatar-view.component.html',
  styleUrls: ['./avatar-view.component.css']
})
export class AvatarViewComponent implements OnInit {
  avatarUrl: string | null = null;
  error?: string;
  loading = false;
  topUrl?: string;
  bottomUrl?: string;
  shoesUrl?: string;
  dragging = false;

  constructor(private avatarService: AvatarService) {}

  ngOnInit(): void {
    const data = localStorage.getItem('measurements');
    const measurements = data ? JSON.parse(data) : undefined;
    this.loadAvatar(measurements);
  }

  async loadAvatar(measurements?: any): Promise<void> {
    try {
      this.error = undefined;
      this.loading = true;
      this.avatarUrl = await this.avatarService.getAvatarUrl(measurements);
    } catch {
      this.error = 'Failed to load avatar.';
    }
    this.loading = false;
  }

  allowDrop(ev: DragEvent): void {
    ev.preventDefault();
  }

  dragEnter(ev: DragEvent): void {
    ev.preventDefault();
    this.dragging = true;
  }

  dragLeave(ev: DragEvent): void {
    ev.preventDefault();
    this.dragging = false;
  }

  onDrop(ev: DragEvent): void {
    ev.preventDefault();
    this.dragging = false;
    const data = ev.dataTransfer?.getData('text/plain');
    if (!data) { return; }
    const item = JSON.parse(data);
    switch(item.category) {
      case 'top': this.topUrl = item.url; break;
      case 'bottom': this.bottomUrl = item.url; break;
      case 'shoes': this.shoesUrl = item.url; break;
    }
  }
}
