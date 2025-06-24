import { Component, OnInit } from '@angular/core';
import { WardrobeService } from '../../services/wardrobe.service';
import { ClothingItem } from '../../models/fashion.models';

@Component({
  selector: 'app-wardrobe',
  templateUrl: './wardrobe.component.html',
  styleUrls: ['./wardrobe.component.scss']
})
export class WardrobeComponent implements OnInit {
  items: ClothingItem[] = [];

  constructor(private wardrobe: WardrobeService) {}

  ngOnInit(): void {
    this.items = this.wardrobe.getItems();
  }
}
