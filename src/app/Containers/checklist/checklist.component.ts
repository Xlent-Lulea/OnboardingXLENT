import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { PersonService } from '../../services/person.service';
import { Person, Task } from '../../models/task.interface';
import { Observable, finalize, switchMap, tap, withLatestFrom } from 'rxjs';
import { TaskType } from '../../models/task.interface';
import { Router, ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute
  ) {}

  getTaskTypeValues(): TaskType[] {
    return Object.keys(TaskType) as TaskType[];
  }

  updateTaskInEntities(taskToUpdate: Task, tasks: Task[]): void {
    const foundTask = tasks.find(t => t.id === taskToUpdate.id);
    if (foundTask) {
      Object.assign(foundTask, taskToUpdate);
    }
  }


  updateTaskStatus(task: Task): void {
    this.taskService
      .updateTaskCompletionStatus(task.id!)
      .pipe( )

  }
}
