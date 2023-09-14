import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task, TaskType } from '../../models/task.interface';
import { Person } from 'src/app/models/task.interface';
import { MatAccordion } from '@angular/material/expansion';
import { PersonService } from 'src/app/services/person.service';
import { Observable } from 'rxjs';

/**
 * @title Accordion with expand/collapse all toggles
 */
@Component({
  selector: 'app-expansion-panel',
  templateUrl: 'expansion-panel.component.html',
  styleUrls: ['expansion-panel.component.scss'],
})
export class ExpansionPanelComponent {
  public selectedPerson$: Observable<Person | null> = this.personService.selectedPerson$;

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  tasksByType: { [key in TaskType]?: Task[] } = {};
  taskTypes: TaskType[] = Object.values(TaskType).filter(
    (value) => typeof value === 'string'
  ) as TaskType[];

  @Input() selectedTaskType: string = '';
  @Input() selectedPerson: Person | null = null;

  constructor(
    private taskService: TaskService,
    private personService: PersonService
  ) {}

  ngOnInit() {
    console.log('Task Types:', this.taskTypes);
    this.selectedPerson$.subscribe(person => {
        console.log('Selected Person:', person);
    });
}

  shouldShowDivider(task: Task, index: number, tasks: Task[]): boolean {
    if (index === 0) return false;
    return tasks[index - 1].taskType === task.taskType;
  }

  fetchTasksByType(taskType: TaskType, personId: number): void {
    this.taskService
      .getTasksByPersonAndType(personId, taskType as unknown as string)
      .subscribe((tasks: Task[]) => {
        console.log('Tasks for type', taskType, tasks);
        this.tasksByType[taskType] = tasks;
      });
  }
}
