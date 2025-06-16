import { Component } from '@angular/core';

@Component({
  selector: 'app-mix-match',
  templateUrl: './mix-match.component.html',
  styleUrls: ['./mix-match.component.css']
})
export class MixMatchComponent {
  outfits: string[] = ['Hat', 'Shirt', 'Pants', 'Shoes'];
}
