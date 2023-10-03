import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Person, Task } from '../models/task.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class PersonService {
  private selectedPersonSubject = new BehaviorSubject<Person | null>(null);
  public selectedPerson$ = this.selectedPersonSubject.asObservable();

  public personsUrl = `${window.location.protocol}//${window.location.hostname}:8081`;

  constructor(private http: HttpClient) {
    this.refreshActivePersons();
  }

  updateSelectedPerson(person: Person | null): void {
    this.selectedPersonSubject.next(person);
  }

  refreshActivePersons(): void {
    this.getActivePersons().subscribe();
  }

  getAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.personsUrl}/persons`);
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.personsUrl}/person/${id}`).pipe(
      tap((person) => {
        localStorage.setItem('personId', '' + id);
        this.updateSelectedPerson(person);
      })
    );
  }

  getActivePersons(): Observable<Person[]> {
    const url = `${this.personsUrl}/activePersons`;
    return this.http.get<Person[]>(url);
  }

  createPerson(person: Person): Observable<Person> {
    const url = `${this.personsUrl}/createPerson`;
    return this.http.post<Person>(url, person);
  }

  updatePerson(person: Person): Observable<Person> {
    const url = `${this.personsUrl}/updatePerson`;
    return this.http.post<Person>(url, person);
  }

  addTask(personId: number, task: Task[]): Observable<Task> {
    const url = `${this.personsUrl}/${personId}/tasks`;
    return this.http.post<Task>(url, task);
  }

  removeTask(personId: number, taskId: number): Observable<void> {
    const url = `${this.personsUrl}/${personId}/tasks/${taskId}`;
    return this.http.delete<void>(url);
  }

  deactivatePerson(personId: number): Observable<Person> {
    return this.http.put<Person>(`${this.personsUrl}/person/${personId}/deactivate`, {}).pipe(
      tap((person) => console.log('Person deactivated', person))
    );
  }

  activatePerson(personId: number): Observable<Person> {
    return this.http.put<Person>(`${this.personsUrl}/person/${personId}/activate`, {}).pipe(
      tap((person) => console.log('Person activated', person))
    );
  }

  deletePerson(personId: number): Observable<void> {
    return this.http.delete<void>(`${this.personsUrl}/person/${personId}`, {});
  }
}

