import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TaskType } from 'src/app/models/task-type.interface';
import { SnackBarService } from './snack-bar-service';

@Injectable({
  providedIn: 'root',
})
export class TaskTypeService {
  private taskTypesUrl = `${window.location.protocol}//${window.location.hostname}:8081/taskTypes`;

  constructor(private http: HttpClient, private snackBarService: SnackBarService) {}

  getAll(): Observable<TaskType[]> {
    return this.http.get<TaskType[]>(this.taskTypesUrl);
  }

  create(taskTypeName: string): Observable<TaskType> {
    const taskTypeData = { name: taskTypeName };
    return this.http.post<TaskType>(this.taskTypesUrl, taskTypeData).pipe(
      tap((type) => this.snackBarService.show('Kategori ' + type.name + ' sparad!'))
    );
  }

  delete(taskTypeId: number): Observable<void> {
    const url = `${this.taskTypesUrl}/${taskTypeId}`;
    return this.http.delete<void>(url).pipe(
      tap(() => this.snackBarService.show('Kategori borttagen'))
    );
  }
}
