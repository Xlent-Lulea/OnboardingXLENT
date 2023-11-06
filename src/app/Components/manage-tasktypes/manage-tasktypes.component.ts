import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Import FormBuilder and FormGroup
import { MatDialog } from '@angular/material/dialog';
import { TaskType } from 'src/app/models/task-type.interface';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-manage-tasktypes',
  templateUrl: './manage-tasktypes.component.html',
  styleUrls: ['./manage-tasktypes.component.scss'],
})
export class ManageTasktypesComponent {
  @Input() taskTypes: TaskType[] = [];
  @Output() createTaskType = new EventEmitter<string>();
  @Output() deleteTaskType = new EventEmitter<number>();

  taskTypeForm: FormGroup;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.taskTypeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  addTaskType() {
    const newTaskTypeControl = this.taskTypeForm.get('newTaskType');
    if (newTaskTypeControl) {
      const newTaskTypeValue = newTaskTypeControl.value;
      if (newTaskTypeValue) {
        this.createTaskType.emit(newTaskTypeValue);
        this.taskTypeForm.reset();  // Reset the form
      }
    }
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
