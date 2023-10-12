import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Person } from '../models/person.interface';
import { PersonTask } from '../models/person-task.interface';

@Injectable({
  providedIn: 'root',
})

export class PersonService {
  private selectedPersonSubject = new BehaviorSubject<Person | null>(null);
  public selectedPerson$ = this.selectedPersonSubject.asObservable();

  private personsUrl = `${window.location.protocol}//${window.location.hostname}:8081`;

  constructor(private http: HttpClient) { }

  updateSelectedPerson(person: Person | null): void {
    this.selectedPersonSubject.next(person);
  }

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.personsUrl}/persons`);
  }

  getById(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.personsUrl}/person/${id}`).pipe(
      tap((person) => {
        localStorage.setItem('personId', '' + id);
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
    return this.http.post<Person>(url, person);
  }

  update(person: Person): Observable<Person> {
    const url = `${this.personsUrl}/person/${person.id}`;
    return this.http.put<Person>(url, person);
  }

  remove(personId: number): Observable<void> {
    return this.http.delete<void>(`${this.personsUrl}/person/${personId}`);
  }

  deactivate(personId: number): Observable<Person> {
    return this.http.put<Person>(`${this.personsUrl}/person/${personId}/deactivate`, {}).pipe(
      tap((person) => console.log('Person deactivated', person))
    );
  }

  activate(personId: number): Observable<Person> {
    return this.http.put<Person>(`${this.personsUrl}/person/${personId}/activate`, {}).pipe(
      tap((person) => console.log('Person activated', person))
    );
  }

  getTasksByPersonId(personId: number): Observable<PersonTask[]> {
    return this.http.get<PersonTask[]>(`${this.personsUrl}/person/${personId}/tasks`);
  }

  updateTaskCompletionStatus(taskId: number): Observable<PersonTask> {
    const personId = localStorage.getItem('personId');
    return this.http.put<PersonTask>(`${this.personsUrl}/person/${personId}/tasks/${taskId}/toggle-completed`, {});
  }
}

