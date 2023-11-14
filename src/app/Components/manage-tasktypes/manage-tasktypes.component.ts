import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskType } from 'src/app/models/task-type.interface';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-manage-tasktypes',
  templateUrl: './manage-tasktypes.component.html',
  styleUrls: ['./manage-tasktypes.component.scss'],
})
export class ManageTasktypesComponent {
  @Input({ required: true }) taskTypes: TaskType[] = [];
  @Output() createTaskType = new EventEmitter<TaskType>();
  @Output() updateTaskType = new EventEmitter<TaskType>();
  @Output() deleteTaskType = new EventEmitter<number>();

  taskTypeForm: FormGroup;
  selectedType: TaskType | null = null;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.taskTypeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  select(type: TaskType): void {
    this.selectedType = type;

    this.taskTypeForm.get('name')?.setValue(type.name);
  }

  save(): void {
    if (!this.selectedType) {
      return this.createTaskType.emit(this.taskTypeForm.value);
    }

    this.selectedType = {
      ...this.selectedType,
      ...this.taskTypeForm.value
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.updateTaskType.emit(this.selectedType!);
    this.selectedType = null;
  }

  deleteTaskTypeDialog(taskTypeId: number): void {
    const dialogData = new ConfirmDialogModel(
      'Bekräfta borttagning',
      'Är du säker på att du vill ta bort den här kategorin? Observera att även alla uppgifter kopplade till kategorin kommer att tas bort.'
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // If user clicked Yes, proceed with deletion
        this.deleteTaskType.emit(taskTypeId);
      }
    });
  }
}
