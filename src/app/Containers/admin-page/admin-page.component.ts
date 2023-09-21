import { Component } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Person, Task } from 'src/app/models/task.interface';
import { PersonService } from 'src/app/services/person.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent {

  allPersons$: Observable<Person[]> = this.personService.allPersons$;
  selectedPerson$: Observable<Person | null> = this.personService.selectedPerson$;
  tasks$!: Observable<Task[]>;

  constructor(private personService: PersonService, private taskService: TaskService) { }

  createPerson(person: Person): void {
    this.personService.createPerson(person).subscribe();
  }

  removePerson(personId: number): void {
    this.personService.deletePerson(personId).subscribe();
  }

  toggleActivePerson(params: { id: number, active: boolean }): void {
    if (params.active) {
      this.personService.activatePerson(params.id).subscribe();
    } else {
      this.personService.deactivatePerson(params.id).subscribe();
    }
  }

  createTask(task: Task): void {
    this.selectedPerson$.pipe(
      switchMap((person) => this.taskService.createTask(person!.id, task.taskType, task))
    ).subscribe();
  }

  removeTask(taskId: number): void {
    this.selectedPerson$.pipe(
      switchMap((person) => this.taskService.deleteTask(person!.id, taskId))
    )
  }
}
