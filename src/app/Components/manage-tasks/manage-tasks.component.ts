import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from 'src/app/models/task.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskType } from 'src/app/models/task-type.interface';

@Component({
  selector: 'app-manage-tasks',
  templateUrl: './manage-tasks.component.html',
  styleUrls: ['./manage-tasks.component.scss'],
})
export class ManageTasksComponent implements OnChanges {
  TaskForm: FormGroup;

  filteredTasks: Task[] = [];

  @Input() tasks: Task[] | null = [];
  @Input() taskTypes: TaskType[] | null = [];
  @Output() createTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() removeTask: EventEmitter<number> = new EventEmitter<number>();

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.TaskForm = this.fb.group({
      taskType: [null, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      url: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['tasks']) {
      return;
    }

    this.filterTasks();
  }

  // Filter tasks based on selected taskType
  filterTasks(): void {
    const type: TaskType | null = this.TaskForm.get('taskType')?.value;
    this.filteredTasks = type ?
      this.tasks?.filter((task) => task.typeId === type.id) || [] :
      this.tasks || [];
  }

  save(): void {
    const task: Task = this.TaskForm.value;
    this.createTask.emit(task);
  }

  deleteTask(taskId: number): void {
    const dialogData = new ConfirmDialogModel(
      'Bekräfta borttagning',
      'Är du säker på att du vill ta bort den här uppgiften?'
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
}
