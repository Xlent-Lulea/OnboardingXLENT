import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Person, Task } from 'src/app/models/task.interface';
import { TaskType } from 'src/app/models/task.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-manage-tasks',
  templateUrl: './manage-tasks.component.html',
  styleUrls: ['./manage-tasks.component.scss'],
})
export class ManageTasksComponent implements OnChanges {
  TaskForm: FormGroup;

  taskTypes = Object.keys(TaskType);
  filteredTasks: Task[] = [];

  @Input() person: Person | null = null;
  @Output() createTask: EventEmitter<{ personId: number, task: Task }> = new EventEmitter<{ personId: number, task: Task }>();
  @Output() removeTask: EventEmitter<{ personId: number, taskId: number }> = new EventEmitter<{ personId: number, taskId: number }>();
  @Output() tasksChange: EventEmitter<Task[]> = new EventEmitter<Task[]>();

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.TaskForm = this.fb.group({
      taskType: ['', Validators.required],
      urltitle: ['', Validators.required],
      description: ['', Validators.required],
      url: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['person']) {
      return;
    }

    this.filterTasks();
  }

  // Filter tasks based on selected taskType
  filterTasks(): void {
    const type: TaskType | null = this.TaskForm.get('taskType')?.value;
    this.filteredTasks = type ?
      this.person?.taskEntities?.filter((task) => task.taskType === type) || [] :
      this.person?.taskEntities || [];
  }

  save(personId: number): void {
    const task: Task = this.TaskForm.value;
    this.createTask.emit({ personId, task});
  }

  deleteTask(personId: number, taskId: number): void {
    const dialogData = new ConfirmDialogModel(
      'Bekräfta borttagning',
      'Är du säker på att du vill ta bort den här uppgiften?'
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.person) {
        // If user clicked Yes, proceed with deletion
        this.removeTask.emit({ personId, taskId });
      }
    });
  }
}
