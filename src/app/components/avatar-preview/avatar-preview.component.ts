import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avatar-preview',
  templateUrl: './avatar-preview.component.html',
  styleUrls: ['./avatar-preview.component.css']
})
export class AvatarPreviewComponent {
  avatarUrl?: string;
  measurement?: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.avatarUrl = navigation?.extras.state?.['avatarUrl'];
    this.measurement = navigation?.extras.state?.['measurement'];
  }

  next(): void {
    this.router.navigate(['/avatar']);
  }
}
