import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TaskType } from 'src/app/models/task-type.interface';
import { SnackBarService } from './snack-bar-service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskTypeService {

  constructor(private http: HttpClient, private snackBarService: SnackBarService) {}

  getAll(): Observable<TaskType[]> {
    return this.http.get<TaskType[]>(`${environment.apiUrl}/taskTypes`);
  }

  create(type: TaskType): Observable<TaskType> {
    return this.http.post<TaskType>(`${environment.apiUrl}/taskTypes`, type).pipe(
      tap((type) => this.snackBarService.show('Kategori ' + type.name + ' sparad!'))
    );
  }

  update(type: TaskType) {
    return this.http.put<TaskType>(`${environment.apiUrl}/taskTypes/${type.id}`, type).pipe(
      tap(() => this.snackBarService.show('Kategori uppdaterad!'))
    );
  }

  delete(typeId: number): Observable<void> {
    const url = `${environment.apiUrl}/taskTypes/${typeId}`;
    return this.http.delete<void>(url).pipe(
      tap(() => this.snackBarService.show('Kategori borttagen'))
    );
  }
}
