import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

export interface BoxDialogData {
  title: string;
  description: string;
}

@Component({
  templateUrl: './box-dialog.component.html',
})
export class BoxDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<BoxDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BoxDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}




