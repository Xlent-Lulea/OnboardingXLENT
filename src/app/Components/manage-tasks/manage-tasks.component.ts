//task-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task.interface';
import { TaskType } from 'src/app/models/task.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-manage-tasks',
  templateUrl: './manage-tasks.component.html',
  styleUrls: ['./manage-tasks.component.scss'],
})
export class ManageTasksComponent {

  taskTypes = Object.keys(TaskType);
  newTask!: Task;
  filteredTasks: Task[] = [];

  @Input() tasks: Task[] | null = [];
  @Output() createTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() removeTask: EventEmitter<number> = new EventEmitter<number>();

  constructor(public dialog: MatDialog) {
    this.restoreNewTask();
  }

  // Filter tasks based on selected taskType
  filterTasks() {
    this.filteredTasks = this.newTask.taskType ?
      this.tasks?.filter((task) => task.taskType === this.newTask.taskType) || [] :
      this.tasks || [];
  }


  deleteTask(taskId: number): void {
    const dialogData = new ConfirmDialogModel(
      'Bekräfta borttagning',
      'Är du säker?'
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // If user clicked Yes, proceed with deletion
        this.removeTask.emit(taskId);
      }
    });
  }

  private restoreNewTask(): void {
    this.newTask = {
      urltitle: '',
      description: '',
      completed: false,
      active: true,
      url: '',
    } as Task
  }
}
