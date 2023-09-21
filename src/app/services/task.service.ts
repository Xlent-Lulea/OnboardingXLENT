//task.service.ts
//Purpose: To provide a service for the Task model
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, tap } from 'rxjs';
import { Person, Task } from '../models/task.interface';
import { PersonService } from './person.service';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  selectedPerson$: Observable<Person | null> = this.personService.selectedPerson$;

  constructor(private http: HttpClient, private personService: PersonService) {}

  getTasksByPerson (personId: number): Observable<Task[]> {
    let tasks: Observable<Task[]> = this.http.get<Task[]>(`${this.personService.personsUrl}/person/${personId}/tasks`);
    return tasks;
  }

  getTasksByPersonId(personId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.personService.personsUrl}/person/${personId}/tasks`);
  }

  getTasksByPersonAndType(personId: number, taskType: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.personService.personsUrl}/person/${personId}/tasks/type/${taskType}`);
  }

  createTask(personId: number, taskType: string, task: Task): Observable<Task> {
    if (!task.url?.startsWith('http://') && !task.url?.startsWith('https://')) {
      task.url = 'https://' + task.url;
    }
    return this.http.post<Task>(`${this.personService.personsUrl}/person/${personId}/tasks/type/${taskType}`, task).pipe(
      switchMap((task) => this.selectedPerson$.pipe(
        map((person) => {
          if (!person?.taskEntities.find((t) => t.id === task.id)) {
            person?.taskEntities.push(task);
            this.personService.updatePerson(person!);
          }

          return task;
        })
      )),
      tap((task) => console.log('Created task:', task))
    );
  }

  deleteTask(personId: number, taskId: number): Observable<Task> {
    return this.http.delete<Task>(`${this.personService.personsUrl}/person/${personId}/tasks/${taskId}`).pipe(
      switchMap((task) => this.selectedPerson$.pipe(
        map((person) => {
          person?.taskEntities.filter((t) => t.id !== taskId)
          this.personService.updatePerson(person!);
          return task;
        })
      )),
      tap((task) => console.log('Deleted task with id:', task.id))
    );
  }

  updateTaskCompletionStatus(taskId: number): Observable<Task> {
    return this.http.put<Task>(`${this.personService.personsUrl}/task/${taskId}/toggle-completed`, {});
  }
}

