import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ChallengeEntry {
  imageUrl: string;
  description: string;
  rating?: number;
}

@Injectable({ providedIn: 'root' })
export class ChallengeService {
  private entriesSubject = new BehaviorSubject<ChallengeEntry[]>([]);
  entries$ = this.entriesSubject.asObservable();

  addEntry(entry: ChallengeEntry) {
    const current = this.entriesSubject.value;
    this.entriesSubject.next([...current, entry]);
  }

  rateEntry(entry: ChallengeEntry, rating: number) {
    const updated = this.entriesSubject.value.map(e =>
      e === entry ? { ...e, rating } : e
    );
    this.entriesSubject.next(updated);
  }
}
