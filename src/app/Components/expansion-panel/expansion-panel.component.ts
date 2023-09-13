import { Component, ViewChild } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task, TaskType } from '../../models/task.interface';
import { Input } from '@angular/core';
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
  constructor(private taskService: TaskService) { }
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  tasksByType: { [key in TaskType]?: Task[] } = {};
  taskTypes: TaskType[] = Object.values(TaskType).filter(value => typeof value === 'string') as TaskType[];
  @Input() selectedTaskType: string = '';
  // ... your interface and enum definitions ...

  shouldShowDivider(task: Task, index: number, tasks: Task[]): boolean {
    if (index === 0) return false;
    return tasks[index - 1].taskType === task.taskType;
  }


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
        description: "GjHej hjjHej hj hejHej hj hejHej hj hejHej hj hejHej hj hejHej hsasadj hejHej hj hejHej hj hejHej hj hejHej hj hejHej hj hejHej hj hejHej hj hejHej hj hejHej hj hejHej hj hejHej hj hejHej hj hejHej hj hejHej hj hejHej hj hejHej hj hejHej hj hejHej hj hejHej hj hejHej hj he hej",
        active: true
      },
      {
        urltitle: "2 Introduction",
        taskType: TaskType.WELCOME,
        url: "https://example.com/introduction",
        completed: false,
        description: "2 Get introduced to the plasadsadadstform.",
        active: true
      },
      {
        urltitle: "Meet Your Buddy",
        taskType: TaskType.BUDDY,
        url: "https://example.com/meetbuddy",
        completed: false,
        description: "Meet and chat with your assigned buddyadsdsaasddasdas.",
        active: true
      },
      {
        urltitle: "Recruitment Training",
        taskType: TaskType.START,
        url: "https://example.com/recruitment",
        completed: false,
        description: "Understand the recruitment processadsassdadsadsadsadsadsdsaadsdsdsadsadass.",
        active: true
      },
      {
        urltitle: "Admin Intro",
        taskType: TaskType.ADMIN,
        url: "https://example.com/admin-intro",
        completed: false,
        description: "Lär dig om anställningsprocessen.sssdasdasdasdsdsadssdsadasdasdsdasdas",
        active: true
      },
      {
        urltitle: "Digital Platform",
        taskType: TaskType.DIGITAL_SETUP,
        url: "https://example.com/digital-setup",
        completed: false,
        description: "Sätt upp din digitala arbetsplaasddsadsadsadsdasdsasaddsadsaadsdsats.",
        active: true
      },
      {
        urltitle: "Konsultrollen Introduktion",
        taskType: TaskType.CONSULTANT,
        url: "https://example.com/konsultrollen",
        completed: false,
        description: "Förstå din roll som konasdssadadsdasdsadsadasdsadassadadsdssult.",
        active: true
      },
      {
        urltitle: "Avslutning av Onboarding",
        taskType: TaskType.FINISH,
        url: "https://example.com/avslut",
        completed: false,
        description: "Slutför onboarding-processensdsadsasddsdsadasdadsadsaddasd.",
        active: true
      }
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
