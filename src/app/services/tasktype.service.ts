// task-type.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskType } from 'src/app/models/task-type.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskTypeService {
  private taskTypesUrl = `${window.location.protocol}//${window.location.hostname}:8081/taskTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TaskType[]> {
    return this.http.get<TaskType[]>(this.taskTypesUrl);
  }

  create(taskTypeName: string): Observable<TaskType> {
    // You can adapt this if your backend API expects a different format for creating a task type.
    const taskTypeData = { name: taskTypeName };
    return this.http.post<TaskType>(this.taskTypesUrl, taskTypeData);
  }

  delete(taskTypeId: number): Observable<void> {
    const url = `${this.taskTypesUrl}/${taskTypeId}`;
    return this.http.delete<void>(url);
  }
}
