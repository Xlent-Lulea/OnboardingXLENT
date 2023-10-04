import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Person, Task } from 'src/app/models/task.interface';
import { PersonService } from 'src/app/services/person.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent {

  allPersons: Person[] = [];
  selectedPerson$: Observable<Person | null> = this.personService.selectedPerson$;

  constructor(private personService: PersonService, private taskService: TaskService) {
    this.personService.getAllPersons().pipe(
      tap((persons) => this.allPersons = persons || [])
    ).subscribe();
  }

  createPerson(person: Person): void {
    this.personService.createPerson(person).subscribe(() =>
      this.personService.getAllPersons().pipe(
        tap((persons) => this.allPersons = persons || [])
      ).subscribe()
    );
  }

  removePerson(personId: number): void {
    this.personService.deletePerson(personId).subscribe(() =>
      this.personService.getAllPersons().pipe(
        tap((persons) => this.allPersons = persons || [])
      ).subscribe()
    );
  }

  toggleActivePerson(params: { id: number, active: boolean }): void {
    params.active ?
      this.personService.activatePerson(params.id).subscribe() :
      this.personService.deactivatePerson(params.id).subscribe();
  }

  createTask(params: { personId: number, task: Task }): void {
    this.taskService.createTask(params.personId, params.task.taskType, params.task).subscribe(() =>
      this.personService.getPerson(params.personId).subscribe()
    );
  }

  removeTask(params: { personId: number, taskId: number }): void {
    this.taskService.deleteTask(params.personId, params.taskId).subscribe(() =>
      this.personService.getPerson(params.personId).subscribe()
    );
  }
}
