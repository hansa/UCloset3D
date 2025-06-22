import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChallengeService, ChallengeEntry } from '../../services/challenge.service';

@Component({
  selector: 'app-fashion-challenge',
  templateUrl: './fashion-challenge.component.html',
  styleUrls: ['./fashion-challenge.component.css']
})
export class FashionChallengeComponent implements OnInit {
  form: FormGroup;
  entries$!: Observable<ChallengeEntry[]>;

  constructor(private fb: FormBuilder, private challengeService: ChallengeService) {
    this.form = this.fb.group({
      imageUrl: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.entries$ = this.challengeService.entries$;
  }

  submit() {
    const { imageUrl, description } = this.form.value;
    if (!imageUrl) {
      return;
    }
    this.challengeService.addEntry({ imageUrl, description });
    this.form.reset();
  }

  rate(entry: ChallengeEntry, rating: number) {
    this.challengeService.rateEntry(entry, rating);
  }
}
