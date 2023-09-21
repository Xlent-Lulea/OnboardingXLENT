// person.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Person } from '../models/task.interface';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class PersonService {
  private allPersonsSubject = new BehaviorSubject<Person[]>([]);
  public allPersons$ = this.allPersonsSubject.asObservable();

  private selectedPersonSubject = new BehaviorSubject<Person | null>(null);
  public selectedPerson$ = this.selectedPersonSubject.asObservable();

  public personsUrl = `${window.location.protocol}//${window.location.hostname}:8081`;

  constructor(private http: HttpClient) {
    this.refreshActivePersons();
  }

  refreshActivePersons(): void {
    this.getActivePersons().subscribe();
  }

  getAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.personsUrl}/persons`).pipe(
      tap((persons) => this.allPersonsSubject.next(persons))
    );
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.personsUrl}/person/${id}`).pipe(
      tap((person) => {
        localStorage.setItem('personId', '' + id);
        this.selectedPersonSubject.next(person);
      })
    );
  }

  getActivePersons(): Observable<Person[]> {
    const url = `${this.personsUrl}/activePersons`;
    return this.http.get<Person[]>(url);
  }

  createPerson(person: Person): Observable<Person> {
    const url = `${this.personsUrl}/createPerson`;
    return this.http.post<Person>(url, person).pipe(
      switchMap((person) => this.allPersons$.pipe(
        map((allPersons) => {
          if (!allPersons.find((p) => p.id === person.id)) {
            allPersons.push(person);
          }
          this.allPersonsSubject.next(allPersons);
          return person;
        })
      )),
    );
  }

  updatePerson(person: Person): Observable<Person> {
    const url = `${this.personsUrl}/updatePerson`;
    return this.http.post<Person>(url, person);
  }

  addTask(personId: number, task: any[]): Observable<Person> {
    const url = `${this.personsUrl}/${personId}/tasks`;
    return this.http.post<Person>(url, task);
  }

  removeTask(personId: number, taskId: number): Observable<Person> {
    const url = `${this.personsUrl}/${personId}/tasks/${taskId}`;
    return this.http.delete<Person>(url);
  }

  deactivatePerson(personId: number): Observable<any> {
    return this.http.put(`${this.personsUrl}/person/${personId}/deactivate`, {}).pipe(
      tap((person) => console.log('Person deactivated', person))
    );
  }

  activatePerson(personId: number): Observable<any> {
    return this.http.put(`${this.personsUrl}/person/${personId}/activate`, {}).pipe(
      tap((person) => console.log('Person activated', person))
    );
  }

  deletePerson(personId: number): Observable<any> {
    return this.http.delete(`${this.personsUrl}/person/${personId}`, {}).pipe(
      switchMap((person) => this.allPersons$.pipe(
        map((allPersons) => allPersons.filter(person => person.id !== personId)),
        map((allPersons) => {
          this.allPersonsSubject.next(allPersons);
          return person;
        })
      )),
      tap((person) => console.log('Deleted person with id:', personId))
    );
  }
}

