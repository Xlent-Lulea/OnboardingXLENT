import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Person } from '../models/person.interface';
import { PersonTask } from '../models/person-task.interface';
import { SnackBarService } from './snack-bar-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class PersonService {
  private selectedPersonSubject = new BehaviorSubject<Person | null>(null);
  public selectedPerson$ = this.selectedPersonSubject.asObservable();

  constructor(private http: HttpClient, private snackBarService: SnackBarService) { }

  updateSelectedPerson(person: Person | null): void {
    localStorage.setItem('personId', '' + person?.id);
    this.selectedPersonSubject.next(person);
  }

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(`${environment.apiUrl}/persons`);
  }

  getById(id: number): Observable<Person> {
    return this.http.get<Person>(`${environment.apiUrl}/person/${id}`).pipe(
      tap((person) => {
        this.updateSelectedPerson(person);
      })
    );
  }

  getActive(): Observable<Person[]> {
    const url = `${environment.apiUrl}/activePersons`;
    return this.http.get<Person[]>(url);
  }

  create(person: Person): Observable<Person> {
    const url = `${environment.apiUrl}/person`;
    return this.http.post<Person>(url, person).pipe(
      tap((person) => this.snackBarService.show(person.name + ' tillagd!'))
    );
  }

  update(person: Person): Observable<Person> {
    const url = `${environment.apiUrl}/person/${person.id}`;
    return this.http.put<Person>(url, person).pipe(
      tap((person) => this.snackBarService.show(person.name + ' sparad!'))
    );
  }

  resetTasks(personId: number): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/person/${personId}/reset`, {}).pipe(
      tap(() => {
        this.snackBarService.show('Person återställd');
      })
    );
  }

  remove(personId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/person/${personId}`).pipe(
      tap(() => {
        this.snackBarService.show('Person borttagen');
        this.resetSelectedPerson(personId);
      })
    );
  }

  deactivate(personId: number): Observable<Person> {
    return this.http.put<Person>(`${environment.apiUrl}/person/${personId}/deactivate`, {}).pipe(
      tap(() => this.resetSelectedPerson(personId))
    );
  }

  activate(personId: number): Observable<Person> {
    return this.http.put<Person>(`${environment.apiUrl}/person/${personId}/activate`, {});
  }

  getTasksByPersonId(personId: number): Observable<PersonTask[]> {
    return this.http.get<PersonTask[]>(`${environment.apiUrl}/person/${personId}/tasks`);
  }

  updateTaskCompletionStatus(taskId: number): Observable<PersonTask> {
    const personId = localStorage.getItem('personId');
    return this.http.put<PersonTask>(`${environment.apiUrl}/person/${personId}/tasks/${taskId}/toggle-completed`, {});
  }

  private resetSelectedPerson(id: number) {
    const storedId = localStorage.getItem('personId');

    if (storedId && +storedId === id) {
      this.updateSelectedPerson(null);
    }
  }
}

