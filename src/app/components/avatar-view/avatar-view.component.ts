import { Component, OnInit } from '@angular/core';
import { AvatarService } from '../../services/avatar.service';

@Component({
  selector: 'app-avatar-view',
  templateUrl: './avatar-view.component.html',
  styleUrls: ['./avatar-view.component.css']
})
export class AvatarViewComponent implements OnInit {
  avatarUrl: string | null = null;

  constructor(private avatarService: AvatarService) {}

  ngOnInit(): void {
    this.loadAvatar();
  }

  async loadAvatar(): Promise<void> {
    this.avatarUrl = await this.avatarService.getAvatarUrl();
  }
}
