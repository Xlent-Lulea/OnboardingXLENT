import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { Person, TaskType } from 'src/app/models/task.interface';
import { PersonService } from 'src/app/services/person.service';
import { TaskService } from 'src/app/services/task.service';



@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss']
})
export class LoginBoxComponent implements OnInit {
  title = 'onboardingXLENT';
  selectedPerson: Person | null = null;
  newPerson: Person = { id: 0, name: '', email: '', tasks: [], active: true };
  activePersons$: Observable<Person[]> = this.personService.activePersons$;
  selectedPerson$: Observable<Person | null> = this.personService.selectedPerson$;
  name$: Observable<String> = this.selectedPerson$.pipe(
    tap((person) => this.selectedPerson=person),
    map((person) => person?.name ||"" )
  );
  //selectedPerson: Person | null = null;
  selectedTaskType = '';
  tasks = [];
  welcomeDialogRef: any;



  constructor(
    private router: Router,

    private personService: PersonService,
    private taskService: TaskService,
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
    // this.personService.getActivePersons().subscribe((persons) => {
    //   this.activePersons$ = persons;
    // });
  }

  onPersonSelected(personId: number) {

    console.log('onPersonSelected:', personId);


    // Fetch the selected person details
    this.personService.getPerson(personId).pipe(
      tap((person) => console.log('Selected person:', 'hej test123')),
    ).subscribe();
    //.subscribe((person) => {
    //   this.selectedPerson = person;
    //   this.getPersonTasks(
    //     personId,
    //     this.selectedTaskType ? this.selectedTaskType : 'BLOMBLAD_1'
      //);

      // Öppna WelcomePopupComponent efter att den valda personens information hämtats


    }
  }






