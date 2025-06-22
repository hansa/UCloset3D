import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avatar-preview',
  templateUrl: './avatar-preview.component.html',
  styleUrls: ['./avatar-preview.component.css']
})
export class AvatarPreviewComponent {
  avatarUrl?: string;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.avatarUrl = navigation?.extras.state?.['avatarUrl'];
  }

  next(): void {
    this.router.navigate(['/avatar']);
  }
}
