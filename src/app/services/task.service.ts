import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task.interface';
import { TaskType } from '../models/task-type.interface';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = `${window.location.protocol}//${window.location.hostname}:8081`;

  // TODO: remove
  tasks: Task[] =
    [
      {
        id: 543,
        title: 'Test task',
        description: 'test beskrivning',
        url: '',
        typeId: 0
      }
    ]

  constructor(private http: HttpClient) { }

  // TODO: implement
  getAll(): Observable<Task[]> {
    return of(this.tasks);
  }

  //TODO: implement
  create(task: Task): Observable<Task> {
    return of(task);
/*
    if (!task.url?.startsWith('http://') && !task.url?.startsWith('https://')) {
      task.url = 'https://' + task.url;
    }*/
  }

  // TODO: implement
  remove(taskId: number): Observable<void> {
    return of();
  }

  // TODO: implement
  getTypes(): Observable<TaskType[]> {
    const taskTypes: TaskType[] =
      [
        {
          id: 0,
          name: "Välkommen",
        },
        {
          id: 1,
          name: "Buddy/Coach",
        },
        {
          id: 2,
          name: "Startklar",
        },
        {
          id: 3,
          name: "Anställning och admin",
        },
        {
          id: 4,
          name: "Digital Setup",
        }
        , {
          id: 5,
          name: "Konsultrollen",
        },
        {
          id: 6,
          name: "Avslut!",
        }
      ]


    return of(taskTypes);
  }
}

