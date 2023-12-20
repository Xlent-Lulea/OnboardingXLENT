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

  private personsUrl = `http:///${window.location.hostname}:${environment.port}`;

  constructor(private http: HttpClient, private snackBarService: SnackBarService) { }

  updateSelectedPerson(person: Person | null): void {
    localStorage.setItem('personId', '' + person?.id);
    this.selectedPersonSubject.next(person);
  }

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.personsUrl}/persons`);
  }

  getById(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.personsUrl}/person/${id}`).pipe(
      tap((person) => {
        this.updateSelectedPerson(person);
      })
    );
  }

  getActive(): Observable<Person[]> {
    const url = `${this.personsUrl}/activePersons`;
    return this.http.get<Person[]>(url);
  }

  create(person: Person): Observable<Person> {
    const url = `${this.personsUrl}/person`;
    return this.http.post<Person>(url, person).pipe(
      tap((person) => this.snackBarService.show(person.name + ' tillagd!'))
    );
  }

  update(person: Person): Observable<Person> {
    const url = `${this.personsUrl}/person/${person.id}`;
    return this.http.put<Person>(url, person).pipe(
      tap((person) => this.snackBarService.show(person.name + ' sparad!'))
    );
  }

  remove(personId: number): Observable<void> {
    return this.http.delete<void>(`${this.personsUrl}/person/${personId}`).pipe(
      tap(() => {
        this.snackBarService.show('Person borttagen');
        this.resetSelectedPerson(personId);
      })
    );
  }

  deactivate(personId: number): Observable<Person> {
    return this.http.put<Person>(`${this.personsUrl}/person/${personId}/deactivate`, {}).pipe(
      tap(() => this.resetSelectedPerson(personId))
    );
  }

  activate(personId: number): Observable<Person> {
    return this.http.put<Person>(`${this.personsUrl}/person/${personId}/activate`, {});
  }

  getTasksByPersonId(personId: number): Observable<PersonTask[]> {
    return this.http.get<PersonTask[]>(`${this.personsUrl}/person/${personId}/tasks`);
  }

  updateTaskCompletionStatus(taskId: number): Observable<PersonTask> {
    const personId = localStorage.getItem('personId');
    return this.http.put<PersonTask>(`${this.personsUrl}/person/${personId}/tasks/${taskId}/toggle-completed`, {});
  }

  private resetSelectedPerson(id: number) {
    const storedId = localStorage.getItem('personId');

    if (storedId && +storedId === id) {
      this.updateSelectedPerson(null);
    }
  }
}

