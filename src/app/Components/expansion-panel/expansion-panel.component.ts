import {Component, ViewChild} from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { TaskService } from 'src/app/services/task.service';
import { Task, TaskType } from '../../models/task.interface';
import { Input } from '@angular/core';
import { Person } from 'src/app/models/task.interface';



/**
 * @title Accordion with expand/collapse all toggles
 */
@Component({
  selector: 'app-expansion-panel',
  templateUrl: 'expansion-panel.component.html',
  styleUrls: ['expansion-panel.component.scss'],
})



export class ExpansionPanelComponent {
  constructor(private taskService: TaskService) { }
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  tasksByType: { [key in TaskType]?: Task[] } = {};
  taskTypes: TaskType[] = Object.values(TaskType).filter(value => typeof value === 'string') as TaskType[];
  @Input() selectedTaskType: string = '';
  selectedPerson: Person | null = null;
 

  
  ngOnInit(): void {
    const personId = 137// ... hämta personId du vill hämta uppgifter för ...
    for (let type of this.taskTypes) {
      this.fetchTasksByType(type, personId);
    }
  }
  
  fetchTasksByType(taskType: TaskType, personId: number): void {
    this.taskService.getTasksByPersonAndType(personId, taskType as unknown as string).subscribe((tasks: Task[]) => {
      console.log('Tasks for type', taskType, tasks);
      this.tasksByType[taskType] = tasks;
    });
    
  }
  
}
