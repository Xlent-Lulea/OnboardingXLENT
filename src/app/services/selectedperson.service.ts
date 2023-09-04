// selectedperson.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectedPersonService {
    private personId: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor() {
        const storedPersonId = localStorage.getItem('personId') || '';
        this.personId.next(storedPersonId);
    }

  setPersonId(personId: string) {
    this.personId.next(personId);
    localStorage.setItem('personId', personId);
  }

  getPersonId(): BehaviorSubject<string> {
    return this.personId;
  }
}
