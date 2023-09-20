import { Component } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { Task, Person } from 'src/app/models/task.interface';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  selectedPerson$: Observable<Person | null> =
    this.personService.selectedPerson$;
  tasks$: Observable<Task[]> = this.selectedPerson$.pipe(
    map((person) => person?.taskEntities || [])
  );

  constructor(private personService: PersonService) {}
}
