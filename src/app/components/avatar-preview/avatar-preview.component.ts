import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avatar-preview',
  templateUrl: './avatar-preview.component.html',
  styleUrls: ['./avatar-preview.component.scss']
})
export class AvatarPreviewComponent {
  avatarUrl?: string;
  measurement?: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.avatarUrl = navigation?.extras.state?.['avatarUrl'];
    this.measurement = navigation?.extras.state?.['measurement'];
  }

  isGlb(url?: string): boolean {
    return !!url && url.toLowerCase().endsWith('.glb');
  }

  next(): void {
    this.router.navigate(['/upload-outfits']);
  }
}
