import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Person } from 'src/app/models/task.interface';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  activePersons$: Observable<Person[]> = this.personService.allPersons$.pipe(
    map((persons) => persons.filter((person) => person.active))
  );
  selectedPerson$: Observable<Person | null> = this.personService.selectedPerson$;

  constructor(
    private personService: PersonService
  ) { }

  selectPerson(personId: number) {
    console.log('onPersonSelected:', personId);

    // Fetch the selected person details
    this.personService.getPerson(personId).subscribe();
  }
}
