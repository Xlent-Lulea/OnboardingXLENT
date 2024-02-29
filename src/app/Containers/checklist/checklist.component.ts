import { Component } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { map, switchMap, tap } from 'rxjs';
import { TaskType } from 'src/app/models/task-type.interface';
import { PersonTask } from 'src/app/models/person-task.interface';
import { TaskTypeService } from 'src/app/services/tasktype.service';
import { Person } from 'src/app/models/person.interface';
@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
})
export class ChecklistComponent {
  taskTypes: TaskType[] = [];
  buddyTaskTypes: TaskType[] = [];
  buddyTasks: PersonTask[] = [];
  personTasks: PersonTask[] = [];
  person: Person | null = null;
  checklistDescription: string = '';

  constructor(
    private taskTypeService: TaskTypeService,
    private personService: PersonService
  ) {
    const personId = localStorage.getItem('personId');

    if (!personId || personId === 'undefined') {
      return;
    }

    this.personService.getById(+personId).pipe(
      tap((person) => {
        this.person = person;
        this.checklistDescription = person.mentee ?
          'Här kan du se checklistan för ' + person.mentee.name :
          'Här får du en introduktion som nyanställd';
      }),
      switchMap((person) => this.taskTypeService.getAll().pipe(
        map((types) => {
          this.taskTypes = types.filter((t) => !t.isBuddyType);
          this.buddyTaskTypes = types.filter((t) => t.isBuddyType);

          return person.mentee ? person.mentee.id : person.id;
        }),
        // If current user is a Buddy, get the tasks of the mentee instead of current user
        switchMap((id) => this.personService.getTasksByPersonId(id).pipe(
          tap((tasks) => this.personTasks = tasks || [])
        ))
      ))
    ).subscribe(() => {
      // If current user is a Buddy, get all tasks for this user
      if (this.person?.mentee) {
        this.personService.getTasksByPersonId(this.person!.id).pipe(
          tap((tasks) => this.buddyTasks = tasks || [])
        ).subscribe();
      }
    });
  }

  updateTaskStatus(task: PersonTask): void {
    this.personService.updateTaskCompletionStatus(task.id).subscribe();
  }
}
