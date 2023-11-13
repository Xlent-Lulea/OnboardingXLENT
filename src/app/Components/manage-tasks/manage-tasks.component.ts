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
  taskForm: FormGroup;
  filteredTasks: Task[] = [];
  selectedTask: Task | null = null;

  @Input({ required: true }) tasks: Task[] | null = [];
  @Input({ required: true }) taskTypes: TaskType[] | null = [];
  @Output() createTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() updateTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() removeTask: EventEmitter<number> = new EventEmitter<number>();

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.taskForm = this.fb.group({
      type: [null, Validators.required],
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      url: ['', Validators.maxLength(255)],
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
    const type: TaskType | null = this.taskForm.get('type')?.value;
    this.filteredTasks = type ?
      this.tasks?.filter((task) => task.type.id === type.id) || [] :
      this.tasks || [];
  }

  add(): void {
    this.selectedTask = {
      ...this.taskForm.value
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  select(task: Record<string, any>): void {
    this.selectedTask = task as Task;

    for (const controlName of Object.keys(this.taskForm.controls)) {
      const control = this.taskForm.get(controlName);

      if (controlName === 'type') {
        control?.setValue(this.taskTypes?.find((type) => type.id === task['type'].id));
      } else if (controlName in task) {
        control?.setValue(task[controlName])
      }
    }

    this.filterTasks();
  }

  save(): void {
    if (!this.selectedTask) {
      return this.createTask.emit(this.taskForm.value);
    }

    this.selectedTask = {
      ...this.selectedTask,
      ...this.taskForm.value
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.updateTask.emit(this.selectedTask!);
    this.selectedTask = null;
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
