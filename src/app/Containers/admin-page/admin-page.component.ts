import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { Person } from 'src/app/models/person.interface';
import { TaskType } from 'src/app/models/task-type.interface';
import { Task } from 'src/app/models/task.interface';
import { PersonService } from 'src/app/services/person.service';
import { TaskService } from 'src/app/services/task.service';
import { TaskTypeService } from 'src/app/services/tasktype.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent {

  allPersons: Person[] = [];
  taskTypes: TaskType[] = [];
  tasks: Task[] = [];

  constructor(
    private personService: PersonService,
    private taskService: TaskService,
    private taskTypeService: TaskTypeService
  ) {
    this.personService.getAll().pipe(
      tap((persons) => this.allPersons = persons || [])
    ).subscribe();
    this.taskService.getAll().pipe(
      tap((tasks) => this.tasks = tasks || []),
    ).subscribe();
    this.taskService.getTypes().pipe(
      tap((types) => this.taskTypes = types || []),
    ).subscribe();
  }

  createPerson(person: Person): void {
    this.personService.create(person).subscribe(() =>
      this.personService.getAll().pipe(
        tap((persons) => this.allPersons = persons || [])
      ).subscribe()
    );
  }

  updatePerson(person: Person) {
    this.personService.update(person).subscribe(() =>
      this.personService.getAll().pipe(
        tap((persons) => this.allPersons = persons || [])
      ).subscribe()
    );
  }

  removePerson(personId: number): void {
    this.personService.remove(personId).subscribe(() =>
      this.personService.getAll().pipe(
        tap((persons) => this.allPersons = persons || [])
      ).subscribe()
    );
  }

  toggleActivePerson(params: { id: number, active: boolean }): void {
    params.active ?
      this.personService.activate(params.id).subscribe() :
      this.personService.deactivate(params.id).subscribe();
  }

  createTask(task: Task): void {
    this.taskService.create(task).subscribe(() =>
      this.taskService.getAll().pipe(
        tap((tasks) => this.tasks = tasks)
      ).subscribe()
    );
  }

  createTaskType(taskTypeName: string) {
    // Make a request to your backend to create a new task type
    this.taskTypeService.create(taskTypeName).subscribe((newTaskType) => {
      // Handle the newly created task type, e.g., add it to your taskTypes array
      this.taskTypes.push(newTaskType);
    });
  }

  removeTask(taskId: number): void {
    this.taskService.remove(taskId).subscribe(() =>
      this.taskService.getAll().pipe(
        tap((tasks) => this.tasks = tasks)
      ).subscribe()
    );
  }

  deleteTaskType(taskTypeId: number) {
    this.taskTypeService.delete(taskTypeId).subscribe(
      () => {
        // Handle the success case (e.g., removing the deleted task type from your list)
        // You might want to update your list of task types after a successful deletion.
      },
      (error) => {
        // Handle the error case (e.g., displaying an error message)
        console.error('Error deleting task type:', error);
      }
    );
  }
}
