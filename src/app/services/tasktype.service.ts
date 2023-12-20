import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TaskType } from 'src/app/models/task-type.interface';
import { SnackBarService } from './snack-bar-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskTypeService {
  private taskTypesUrl = `http:///${window.location.hostname}:${environment.port}/taskTypes`;

  constructor(private http: HttpClient, private snackBarService: SnackBarService) {}

  getAll(): Observable<TaskType[]> {
    return this.http.get<TaskType[]>(this.taskTypesUrl);
  }

  create(type: TaskType): Observable<TaskType> {
    return this.http.post<TaskType>(this.taskTypesUrl, type).pipe(
      tap((type) => this.snackBarService.show('Kategori ' + type.name + ' sparad!'))
    );
  }

  update(type: TaskType) {
    return this.http.put<TaskType>(`${this.taskTypesUrl}/${type.id}`, type).pipe(
      tap(() => this.snackBarService.show('Kategori uppdaterad!'))
    );
  }

  delete(typeId: number): Observable<void> {
    const url = `${this.taskTypesUrl}/${typeId}`;
    return this.http.delete<void>(url).pipe(
      tap(() => this.snackBarService.show('Kategori borttagen'))
    );
  }
}
