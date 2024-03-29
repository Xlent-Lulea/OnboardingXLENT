import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { Person } from 'src/app/models/person.interface';

@Component({
  selector: 'app-manage-persons',
  templateUrl: './manage-persons.component.html',
  styleUrls: ['./manage-persons.component.scss'],
})

export class ManagePersonsComponent {
  personForm: FormGroup;
  selectedPerson: Person | null = null;

  @Input({ required: true }) allPersons: Person[] | null = [];

  @Output() createPerson: EventEmitter<Person> = new EventEmitter<Person>();
  @Output() updatePerson: EventEmitter<Person> = new EventEmitter<Person>();
  @Output() resetPerson: EventEmitter<number> = new EventEmitter<number>();
  @Output() removePerson: EventEmitter<number> = new EventEmitter<number>();
  @Output() toggleActive: EventEmitter<{ id: number, active: boolean }> = new EventEmitter<{ id: number, active: boolean }>();

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.personForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      isBuddy: [false, Validators.required],
      mentee: [null]
    });
  }

  add(): void {
    this.selectedPerson = {
      ...this.personForm.value
    };
  }

  select(person: Person): void {
    this.selectedPerson = person;

    this.personForm.get('name')?.setValue(person.name);
    this.personForm.get('email')?.setValue(person.email);
    this.personForm.get('mentee')?.setValue(person.mentee);
    this.personForm.get('isBuddy')?.setValue(person.mentee ? true : false);
  }

  submitForm(): void {
    if (!this.selectedPerson?.id) {
      return this.createPerson.emit(this.personForm.value);
    }

    this.selectedPerson = {
      ...this.selectedPerson,
      ...this.personForm.value
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.updatePerson.emit(this.selectedPerson!);
    this.selectedPerson = null;
  }

  openResetDialog(personId: number): void {
    const dialogData = new ConfirmDialogModel(
      'Bekräfta återställning',
      'Är du säker på att du vill nollställa alla tasks för den här personen?'
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resetPerson.emit(personId);
      }
    });
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
}
