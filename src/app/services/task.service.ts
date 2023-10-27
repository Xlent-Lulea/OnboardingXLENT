import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Task } from '../models/task.interface';
import { TaskType } from '../models/task-type.interface';
import { SnackBarService } from './snack-bar-service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = `${window.location.protocol}//${window.location.hostname}:8081`;

  constructor(private http: HttpClient, private snackBarService: SnackBarService) { }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.tasksUrl}/tasks`);
  }

  create(task: Task): Observable<Task> {
    if (task.url && !task.url?.startsWith('http://') && !task.url?.startsWith('https://')) {
      task.url = 'https://' + task.url;
    }

    return this.http.post<Task>(`${this.tasksUrl}/tasks`, task).pipe(
      tap(() => this.snackBarService.show('Task sparad!'))
    );
  }

  remove(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.tasksUrl}/tasks/${taskId}`).pipe(
      tap(() => this.snackBarService.show('Task borttagen'))
    );
  }

  getTypes(): Observable<TaskType[]> {
    return this.http.get<TaskType[]>(`${this.tasksUrl}/taskTypes`);
  }
}

