import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../models/task.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-manage-persons',
  templateUrl: './manage-persons.component.html',
  styleUrls: ['./manage-persons.component.scss'],
})

export class ManagePersonsComponent {
  personForm: FormGroup;
  newPerson!: Person;

  @Input() allPersons: Person[] | null = [];

  @Output() createPerson: EventEmitter<Person> = new EventEmitter<Person>();
  @Output() removePerson: EventEmitter<number> = new EventEmitter<number>();
  @Output() toggleActive: EventEmitter<{ id: number, active: boolean }> = new EventEmitter<{ id: number, active: boolean }>();

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      active: [true],  // set the active field as true
    });

    this.restoreNewPerson();
  }

  submitForm(): void {
    this.createPerson.emit(this.newPerson);
    this.restoreNewPerson();
  }

  openDeleteConfirmationDialog(personId: number): void {
    const dialogData = new ConfirmDialogModel(
      'Bekräfta borttagning',
      'Är du säker på att du vill ta bort den här personen?'
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removePerson.emit(personId);
      }
    });
  }

  private restoreNewPerson(): void {
    this.newPerson = {
      name: '',
      email: '',
      taskEntities: [],
      active: true
    } as unknown as Person;
  }
}
