import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task, TaskType } from '../../models/task.interface';
import { Person } from 'src/app/models/task.interface';
import { MatAccordion } from '@angular/material/expansion';


/**
 * @title Accordion with expand/collapse all toggles
 */
@Component({
  selector: 'app-expansion-panel',
  templateUrl: 'expansion-panel.component.html',
  styleUrls: ['expansion-panel.component.scss'],
})
export class ExpansionPanelComponent {


  @ViewChild(MatAccordion) accordion!: MatAccordion;
  tasksByType: { [key in TaskType]?: Task[] } = {};
  taskTypes: TaskType[] = Object.values(TaskType).filter(
    (value) => typeof value === 'string'
  ) as TaskType[];

  taskKeys: TaskType[] = Object.keys(TaskType) as TaskType[];

  @Input() selectedPerson: Person | null = null;


  constructor(
    private taskService: TaskService,
  ) {}



  shouldShowDivider(task: Task, index: number, taskEntities: Task[]): boolean {
     if (index === 0) return false;
     return taskEntities[index - 1].taskType === task.taskType;
   }

  fetchTasksByType(taskType: TaskType, personId: number): void {
    this.taskService
      .getTasksByPersonAndType(personId, taskType as unknown as string)
      .subscribe((taskEntities: Task[]) => {
        console.log('Tasks for type', taskType, taskEntities);
        this.tasksByType[taskType] = taskEntities;
      });
  }
}
