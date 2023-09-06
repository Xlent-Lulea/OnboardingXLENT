import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.interface';
import { OnInit } from '@angular/core';



@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  providers: [TaskService]
})



export class ChecklistComponent implements OnInit {
  constructor(private taskService: TaskService) { }
  tasks: Task[] = [];


  ngOnInit(): void {
    const personId = 1 // ... get the personId you want to fetch tasks for ...
    this.taskService.getTasksByPerson(personId).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
     });
   }
  
}
