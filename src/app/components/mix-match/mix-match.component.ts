import { Component } from '@angular/core';

@Component({
  selector: 'app-mix-match',
  templateUrl: './mix-match.component.html',
  styleUrls: ['./mix-match.component.scss']
})
export class MixMatchComponent {
  outfits: string[] = ['Hat', 'Shirt', 'Pants', 'Shoes'];
}
