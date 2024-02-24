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
    this.taskTypeService.getAll().pipe(
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

  updatePerson(person: Person): void {
    this.personService.update(person).subscribe(() =>
      this.personService.getAll().pipe(
        tap((persons) => this.allPersons = persons || [])
      ).subscribe()
    );
  }

  resetPerson(personId: number): void {
    this.personService.resetTasks(personId).subscribe(() =>
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

  updateTask(task: Task): void {
    this.taskService.update(task).subscribe(() =>
      this.taskService.getAll().pipe(
        tap((tasks) => this.tasks = tasks)
      ).subscribe()
    );
  }

  createTaskType(taskType: TaskType): void {
    this.taskTypeService.create(taskType).subscribe((newTaskType) => {
      this.taskTypes.push(newTaskType);
    });
  }

  updateTaskType(taskType: TaskType): void {
    this.taskTypeService.update(taskType).subscribe(() =>
      this.taskTypeService.getAll().pipe(
        tap((types) => this.taskTypes = types)
      ).subscribe()
    );
  }

  removeTask(taskId: number): void {
    this.taskService.remove(taskId).subscribe(() =>
      this.taskService.getAll().pipe(
        tap((tasks) => this.tasks = tasks)
      ).subscribe()
    );
  }

  deleteTaskType(taskTypeId: number): void {
    this.taskTypeService.delete(taskTypeId).subscribe(() => {
      this.taskTypeService.getAll().pipe(
        tap((types) => this.taskTypes = types || [])
      );
    });
  }
}
