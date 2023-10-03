import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { PersonService } from '../../services/person.service';
import { Person, Task } from '../../models/task.interface';
import { Observable, tap } from 'rxjs';
import { TaskType } from '../../models/task.interface';
@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
})
export class ChecklistComponent {
  taskTypes: TaskType[] = this.getTaskTypeValues();
  selectedPerson$: Observable<Person | null> =
    this.personService.selectedPerson$.pipe(
      tap((person) => console.log('selectedPerson', person))
    );

  constructor(
    private taskService: TaskService,
    private personService: PersonService
  ) {}

  getTaskTypeValues(): TaskType[] {
    return Object.keys(TaskType) as TaskType[];
  }

  updateTaskStatus(task: Task): void {
    if (task.id !== undefined) {
      this.taskService.updateTaskCompletionStatus(task.id).subscribe(
        (updatedTask) => {
          console.log('Task updated:', updatedTask);
          // Optionally, update local task state or UI here if needed.
        },
        (error) => {
          console.error('Failed to update task:', error);
          // Optionally, revert the checkbox state in case of an error
          task.completed = !task.completed;
        }
      );
    } else {
      console.error('Task ID is undefined');
    }
  }
}
