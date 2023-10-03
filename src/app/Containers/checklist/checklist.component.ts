import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { PersonService } from '../../services/person.service';
import { Person, Task } from '../../models/task.interface';
import { Observable, tap } from 'rxjs';
import { TaskType } from '../../models/task.interface';
import { Router } from '@angular/router';
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
    private personService: PersonService,
    private router: Router,
  ) {}

  getTaskTypeValues(): TaskType[] {
    return Object.keys(TaskType) as TaskType[];
  }

  updateTaskInEntities(taskToUpdate: Task, tasks: Task[]): void {
    const foundTask = tasks.find((t) => t.id === taskToUpdate.id);
    if (foundTask) {
      Object.assign(foundTask, taskToUpdate);
    }
  }

  updateTaskStatus(task: Task): void {
    console.log('test123')
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

