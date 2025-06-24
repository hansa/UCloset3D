import { Component, OnInit } from '@angular/core';
import { MixMatchService } from '../../services/mix-match.service';
import { ClosetItem } from '../../models/closet-item';

@Component({
  selector: 'app-mix-match',
  templateUrl: './mix-match.component.html',
  styleUrls: ['./mix-match.component.scss']
})
export class MixMatchComponent implements OnInit {
  combinations: ClosetItem[][] = [];
  loading = false;
  error?: string;

  constructor(private mixMatchService: MixMatchService) {}

  ngOnInit(): void {
    this.generate();
  }

  async generate(): Promise<void> {
    this.loading = true;
    this.error = undefined;
    try {
      this.combinations = await this.mixMatchService.generateOutfits(5);
    } catch {
      this.error = 'Failed to generate outfits.';
    } finally {
      this.loading = false;
    }
  }
}
