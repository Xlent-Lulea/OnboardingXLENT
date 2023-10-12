import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Person } from 'src/app/models/person.interface';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  activePersons: Person[] = [];
  selectedPerson$: Observable<Person | null> = this.personService.selectedPerson$;

  constructor(
    private personService: PersonService
  ) {
    this.personService.getActive().pipe(
      map((persons) => this.activePersons = persons || [])
    ).subscribe();
  }

  selectPerson(personId: number) {
    console.log('onPersonSelected:', personId);

    // Fetch the selected person details
    this.personService.getById(personId).subscribe();
  }
}
