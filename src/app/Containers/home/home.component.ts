import { Component } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { switchMap, tap } from 'rxjs';
import { PersonTask } from 'src/app/models/person-task.interface';
import { TaskType } from 'src/app/models/task-type.interface';
import { Person } from 'src/app/models/person.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  types: TaskType[] = [];
  personTasks: PersonTask[] = [];
  buddyTasks: PersonTask[] = [];
  taskProgress: number = 0;
  buddyTaskProgress: number = 0;
  person: Person | null = null;

  constructor(private personService: PersonService) {
    const personId = localStorage.getItem('personId');

    if (!personId || personId === 'undefined') {
      return;
    }

    this.personService.getById(+personId).pipe(
      tap((person) => {
        this.person = person;
      }),
      // If current user is a Buddy, get the tasks of the mentee instead of current user
      switchMap((person) => this.personService.getTasksByPersonId(person.mentee ? person.mentee.id : person.id).pipe(
        tap((tasks) => {
          this.personTasks = tasks.filter((t) => !t.task.type.isBuddyType) || [];
          this.taskProgress = this.calculateTaskProgress(this.personTasks);
        })
      ))
    ).subscribe(() => {
      // If current user is a Buddy, get all tasks for this user
      if (this.person?.mentee) {
        this.personService.getTasksByPersonId(this.person!.id).pipe(
          tap((tasks) => {
            this.buddyTasks = tasks.filter((t) => t.task.type.isBuddyType) || [];
            this.buddyTaskProgress = this.calculateTaskProgress(this.buddyTasks);
          })
        ).subscribe();
      }
    });
  }

  calculateTaskProgress(tasks: PersonTask[]): number {
    const totalTasksCount = tasks.length;
    const completedTasksCount = tasks.filter((task) => task.isCompleted).length;
    const percentage = totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;

    return Math.trunc(percentage);
  }
}
