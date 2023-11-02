import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { PersonService } from '../../services/person.service';
import { tap } from 'rxjs';
import { TaskType } from 'src/app/models/task-type.interface';
import { PersonTask } from 'src/app/models/person-task.interface';
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
    private taskService: TaskService,
    private personService: PersonService
  ) {
    this.personId = localStorage.getItem('personId');

    if (!this.personId) {
      return;
    }

    this.personService.getTasksByPersonId(+this.personId).pipe(
      tap((tasks) => this.personTasks = tasks || []),
    ).subscribe();

    this.taskService.getTypes().pipe(
      tap((types) => this.taskTypes = types)
    ).subscribe();
  }

  updateTaskStatus(task: PersonTask): void {
    if (task.id !== undefined) {
      this.personService.updateTaskCompletionStatus(task.id).subscribe(
        (updatedTask) => {
          console.log('Task updated:', updatedTask);
          // Optionally, update local task state or UI here if needed.
        },
        (error) => {
          console.error('Failed to update task:', error);
          // Optionally, revert the checkbox state in case of an error
          task.isCompleted = !task.isCompleted;
        }
      );
    } else {
      console.error('Task ID is undefined');
    }
  }
}
