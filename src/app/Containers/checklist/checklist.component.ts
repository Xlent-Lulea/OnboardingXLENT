import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { PersonService } from '../../services/person.service';
import { take, tap } from 'rxjs';
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

  constructor(
    private taskService: TaskService,
    private personService: PersonService
  ) {
    // TODO: uncomment
    // Get person to make sure all tasks are up to date
    /*const storedPersonId = localStorage.getItem('personId') || '';
    this.personService.getById(+storedPersonId).pipe(
      tap((person) => this.personTasks = person?.personTasks || [])
    ).subscribe();*/

    // TODO: remove
    this.personService.selectedPerson$.pipe(
      tap((person) => this.personTasks = person?.personTasks || []),
      take(1)
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
