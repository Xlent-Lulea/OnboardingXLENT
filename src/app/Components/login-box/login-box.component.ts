import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/task.interface';
import { PersonService } from 'src/app/services/person.service';
import { SelectedPersonService } from 'src/app/services/person.service';
import { TaskService } from 'src/app/services/task.service';



@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss']
})
export class LoginBoxComponent implements OnInit{
  title = 'onboardingXLENT';
  showFlower = true;
  isDarkMode = false;
  persons: Person[] = [];
  newPerson: Person = { id: 0, name: '', email: '', tasks: [], active: true };
  activePersons: Person[] = [];
  selectedPerson: Person | null = null;
  selectedTaskType = '';
  tasks = [];
  welcomeDialogRef: any;

  constructor(
    private router: Router,
    
    private personService: PersonService,
    private taskService: TaskService,
    private selectedPersonService: SelectedPersonService,
    private changeDetector: ChangeDetectorRef,
    public dialog: MatDialog,
    
   
  ) {
    
  }

  // openTaskListPopup(): void {
  //   const dialogRef = this.dialog.open(TaskListPopupComponent, {
  //     width: '500px',
  //     data: { tasks: this.tasks, taskType: this.selectedTaskType }, // Pass both tasks and taskType to the popup
  //   });

  //   dialogRef.afterClosed().subscribe(() => {
  //     // Handle any actions after the popup is closed if needed
  //   });
  // }

  // In your Angular component
  ngOnInit(): void {
    this.personService.getActivePersons().subscribe((persons) => {
      this.activePersons = persons;
    });
  }

  onPersonSelected(personId: number) {
    console.log('onPersonSelected:', personId);
    this.selectedPersonService.setPersonId(personId.toString());
  
    // Fetch the selected person details
    this.personService.getPerson(personId).subscribe((person) => {
      this.selectedPerson = person;
      this.getPersonTasks(
        personId,
        this.selectedTaskType ? this.selectedTaskType : 'BLOMBLAD_1'
      );

      // Öppna WelcomePopupComponent efter att den valda personens information hämtats
      
      
    });
}

  

  getPersonTasks(personId: number, taskType: string) {
    this.taskService
      .getTasksByPersonAndType(personId, taskType)
      .subscribe((tasks) => {
        if (this.selectedPerson) {
          this.selectedPerson.tasks = tasks;
          console.log(
            'Fetched tasks for selected person:',
            this.selectedPerson
          );
        } else {
          console.error('selectedPerson is not set');
        }
      });
  }

  getActivePersons(): void {
    this.personService.getActivePersons().subscribe((persons) => {
      this.activePersons = persons;
    });
  }

  getPersons(): void {
    this.personService.getPersons().subscribe((persons) => {
      this.persons = persons;
    });
  }

  createPerson(person: Person): void {
    this.personService.createPerson(person).subscribe((newPerson) => {
      this.persons.push(newPerson);
    });
  }

  setPersonInactive(id: number): void {
    this.personService.deactivatePerson(id).subscribe((updatedPerson) => {
      const personIndex = this.persons.findIndex(
        (person) => person.id === updatedPerson.id
      );
      this.persons[personIndex] = updatedPerson;
      this.personService.refreshActivePersons();
      this.changeDetector.detectChanges(); // manually trigger change detection
    });
  }

  setPersonActive(id: number): void {
    this.personService.activatePerson(id).subscribe((updatedPerson) => {
      const personIndex = this.persons.findIndex(
        (person) => person.id === updatedPerson.id
      );
      this.persons[personIndex] = updatedPerson;
      this.personService.refreshActivePersons();
      this.changeDetector.detectChanges(); // manually trigger change detection
    });
  }



  removeTask(personId: number, taskId: number): void {
    this.personService
      .removeTask(personId, taskId)
      .subscribe((updatedPerson) => {
        const personIndex = this.persons.findIndex(
          (person) => person.id === updatedPerson.id
        );
        this.persons[personIndex] = updatedPerson;
      });
  }
 
}
