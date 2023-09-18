import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonService } from 'src/app/services/person.service';
import { Person } from '../../models/task.interface';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-manage-persons',
  templateUrl: './manage-persons.component.html',
  styleUrls: ['./manage-persons.component.scss']
})

export class ManagePersonsComponent implements OnInit {
  personForm: FormGroup;
  activePersons: Person[] = [];
  allPersons: Person[] = [];

  constructor(private personService: PersonService, private fb: FormBuilder, public dialog: MatDialog) {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      active: [true],  // set the active field as true
    });
  }

  ngOnInit(): void {
    this.personService.getPersons().subscribe({
      next: (persons) => {
        this.allPersons = persons;
      },
      error: (error) => {
        console.error('Error fetching active persons:', error);
      }
    });
  }

  submitForm(): void {
    const nameValue = this.personForm.get('name')!.value;
    if (!nameValue) {
      console.log('Name cannot be null. Cannot create person.');
      return; // Exit the function if name is null
    }

    const newPerson: Person = {
      id: 0,
      name: nameValue,
      email: this.personForm.get('email')!.value,
      active: this.personForm.get('active')!.value,
      taskEntities: [],
    };

    this.personService.getPersons().subscribe({
      next: (persons: Person[]) => {
        this.activePersons = persons;
      },
      error: (error) => {
        console.error('Error fetching persons:', error);
      }
    });

    this.personService.createPerson(newPerson).subscribe({
      next: (response) => {
        console.log('Person created', response);
      },
      error: (error) => {
        console.log('Error creating person:', error);
      }
    });
  }


  toggleActive(person: Person): void {
    if (person.active) {
      this.personService.deactivatePerson(person.id).subscribe({
        next: (response) => {
          console.log('Person deactivated', response);
          this.reloadPersons();
        },
        error: (error) => {
          console.log('Error deactivating person:', error);
        }
      });
    } else {
      this.personService.activatePerson(person.id).subscribe({
        next: (response) => {
          console.log('Person activated', response);
          this.reloadPersons();
        },
        error: (error) => {
          console.log('Error activating person:', error);
        }
      });
    }
  }

  reloadPersons(): void {
    this.personService.getPersons().subscribe({
      next: (persons) => {
        this.allPersons = persons;
      },
      error: (error) => {
        console.error('Error fetching persons:', error);
      }
    });
  }


  openDeleteConfirmationDialog(personId: number): void {
    const dialogData = new ConfirmDialogModel('Delete Person', 'Are you sure you want to delete this person?');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePerson(personId); // Call the deletePerson method after confirmation
      }
    });
  }

deletePerson(personId: number): void {
  this.personService.deletePerson(personId).subscribe(
    () => {
      // Remove the deleted person from the allPersons array
      this.allPersons = this.allPersons.filter(person => person.id !== personId);
      console.log('Deleted person with id:', personId);
    },
    error => {
      console.error('Error deleting person:', error);
    }
  );


}
}
