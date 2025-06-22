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

  constructor(private avatarService: AvatarService) {}

  ngOnInit(): void {
    this.loadAvatar();
  }

  async loadAvatar(): Promise<void> {
    try {
      this.error = undefined;
      this.avatarUrl = await this.avatarService.getAvatarUrl();
    } catch {
      this.error = 'Failed to load avatar.';
    }
  }

  isGlb(url?: string | null): boolean {
    return !!url && url.toLowerCase().endsWith('.glb');
  }
}
