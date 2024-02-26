import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Task } from '../models/task.interface';
import { SnackBarService } from './snack-bar-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = `http:///${window.location.hostname}:${environment.port}`;

  constructor(private http: HttpClient, private snackBarService: SnackBarService) { }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.tasksUrl}/tasks`);
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.tasksUrl}/tasks`, task).pipe(
      tap(() => this.snackBarService.show('Task sparad!'))
    );
  }

  update(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.tasksUrl}/tasks/${task.id}`, task).pipe(
      tap(() => this.snackBarService.show('Task uppdaterad!'))
    );
  }

  remove(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.tasksUrl}/tasks/${taskId}`).pipe(
      tap(() => this.snackBarService.show('Task borttagen'))
    );
  }
}

