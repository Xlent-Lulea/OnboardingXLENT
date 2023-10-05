import { Component } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { Observable, map } from 'rxjs';
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
  tasks$: Observable<PersonTask[]> = this.selectedPerson$.pipe(
    map((person) => person?.personTasks || [])
  );

  constructor(private personService: PersonService) {}
}
