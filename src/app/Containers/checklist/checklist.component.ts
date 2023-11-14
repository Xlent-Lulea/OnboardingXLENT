import { Component } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { tap } from 'rxjs';
import { TaskType } from 'src/app/models/task-type.interface';
import { PersonTask } from 'src/app/models/person-task.interface';
import { TaskTypeService } from 'src/app/services/tasktype.service';
@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
})
export class ChecklistComponent {
  taskTypes: TaskType[] = [];
  personTasks: PersonTask[] = [];
  personId: string | null;

  constructor(
    private taskTypeService: TaskTypeService,
    private personService: PersonService
  ) {
    this.personId = localStorage.getItem('personId');

    if (!this.personId) {
      return;
    }

    this.personService.getTasksByPersonId(+this.personId).pipe(
      tap((tasks) => this.personTasks = tasks || []),
    ).subscribe();

    this.taskTypeService.getAll().pipe(
      tap((types) => this.taskTypes = types)
    ).subscribe();
  }

  updateTaskStatus(task: PersonTask): void {
    this.personService.updateTaskCompletionStatus(task.id).subscribe();
  }
}
