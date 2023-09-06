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
// ... your interface and enum definitions ...

selectedPerson: Person = {
  id: 3,
  name: "Test",
  email: "Test123@sdaad.com",
  active: true,
  tasks: [
    {
      urltitle: "Introduction",
      taskType: TaskType.WELCOME,
      url: "https://example.com/introduction",
      completed: false,
      description: "Get introduced to the platform.",
      active: true
    },
    {
      urltitle: "Meet Your Buddy",
      taskType: TaskType.BUDDY,
      url: "https://example.com/meetbuddy",
      completed: false,
      description: "Meet and chat with your assigned buddy.",
      active: true
    },
    {
      urltitle: "Recruitment Training",
      taskType: TaskType.START,
      url: "https://example.com/recruitment",
      completed: false,
      description: "Understand the recruitment process.",
      active: true
    }
    // ... Lägg till fler uppgifter om så önskas ...
  ]
};



  
  ngOnInit(): void {
    
    // const personId = 1// ... hämta personId du vill hämta uppgifter för ...
    // for (let type of this.taskTypes) {
    //   this.fetchTasksByType(type, personId);
    // }
  }
  
  fetchTasksByType(taskType: TaskType, personId: number): void {
    this.taskService.getTasksByPersonAndType(personId, taskType as unknown as string).subscribe((tasks: Task[]) => {
      console.log('Tasks for type', taskType, tasks);
      this.tasksByType[taskType] = tasks;
    });
    
  }
  
}
