import { Component } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { Observable, map, tap } from 'rxjs';
import { Person } from 'src/app/models/person.interface';
import { PersonTask } from 'src/app/models/person-task.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  selectedPerson$: Observable<Person | null> =
    this.personService.selectedPerson$;
  personTasks: PersonTask[] = [];

  constructor(private personService: PersonService) {
    const storedPersonId = localStorage.getItem('personId') || '';

    this.personService.getTasksByPersonId(+storedPersonId).pipe(
      tap((tasks) => this.personTasks = tasks || []),
    ).subscribe();
  }
}
