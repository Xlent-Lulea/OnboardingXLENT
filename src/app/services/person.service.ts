import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
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

  // TODO: remove
  personTasks: PersonTask[] = [
    {
      id: 987,
      isCompleted: false,
      personId: 123 as unknown as bigint,
      // same as in taskService
      task: {
        id: 543,
        title: 'Test task',
        description: 'test beskrivning',
        url: '',
        typeId: 0
      }
    }
  ]

  // TODO: remove
  persons: Person[] = [
    {
      id: 123,
      name: 'Test Testsson',
      email: 'test@test.nu',
      active: true,
      personTasks: this.personTasks
    }
  ];

  constructor(private http: HttpClient) { }

  updateSelectedPerson(person: Person | null): void {
    this.selectedPersonSubject.next(person);
  }

  // TODO: remove mock
  getAll(): Observable<Person[]> {
    return of(this.persons);
    // return this.http.get<Person[]>(`${this.personsUrl}/persons`);
  }

  // TODO: remove mock
  getById(id: number): Observable<Person> {

    const person = this.persons.find((person) => person.id === id);
    this.updateSelectedPerson(person!);
    return of(person!);

    /*
    return this.http.get<Person>(`${this.personsUrl}/person/${id}`).pipe(
      tap((person) => {
        localStorage.setItem('personId', '' + id);
        this.updateSelectedPerson(person);
      })
    );*/
  }

  // TODO: remove mock
  getActive(): Observable<Person[]> {
    return of(this.persons.filter((person) => person.active));
    /*const url = `${this.personsUrl}/activePersons`;
    return this.http.get<Person[]>(url);*/
  }

  // TODO: remove mock
  create(person: Person): Observable<Person> {
    this.persons.push(person);
    return of(person);
    /*const url = `${this.personsUrl}/person`;
    return this.http.post<Person>(url, person);*/
  }

  // TODO: remove mock
  update(person: Person): Observable<Person> {
    return of();
    /*
    const url = `${this.personsUrl}/person/${person.id}`;
    return this.http.put<Person>(url, person);*/
  }

  // TODO: remove mock
  remove(personId: number): Observable<void> {
    return of();
    //return this.http.delete<void>(`${this.personsUrl}/person/${personId}`);
  }

  // TODO: remove mock
  deactivate(personId: number): Observable<Person> {
    return of();
    /*return this.http.put<Person>(`${this.personsUrl}/person/${personId}/deactivate`, {}).pipe(
      tap((person) => console.log('Person deactivated', person))
    );*/
  }

  // TODO: remove mock
  activate(personId: number): Observable<Person> {
    return of();
    /*return this.http.put<Person>(`${this.personsUrl}/person/${personId}/activate`, {}).pipe(
      tap((person) => console.log('Person activated', person))
    );*/
  }

  // TODO: remove mock
  addTask(personId: number, task: PersonTask): Observable<PersonTask> {
    return of();
    /*
    const url = `${this.personsUrl}/${personId}/tasks`;
    return this.http.post<PersonTask>(url, task);*/
  }

  // TODO: remove mock
  removeTask(personId: number, taskId: number): Observable<void> {
    return of();
    /*
    const url = `${this.personsUrl}/${personId}/tasks/${taskId}`;
    return this.http.delete<void>(url);*/
  }

  // TODO: remove mock
  getTasksById(personId: number): Observable<PersonTask[]> {
    return of();
    //return this.http.get<PersonTask[]>(`${this.personsUrl}/person/${personId}/tasks`);
  }

  // TODO: remove mock
  updateTaskCompletionStatus(taskId: number): Observable<PersonTask> {
    return of();
    // return this.http.put<PersonTask>(`${this.personsUrl}/task/${taskId}/toggle-completed`, {});
  }
}

