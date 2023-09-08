//task-list.component.ts
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.interface';
import { TaskType } from 'src/app/models/task.interface';
import { PersonService } from 'src/app/services/person.service';
import { Person } from 'src/app/models/task.interface';
import { SelectedPersonService } from 'src/app/services/selectedperson.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-manage-tasks',
  templateUrl: './manage-tasks.component.html',
  styleUrls: ['./manage-tasks.component.scss'],
})
export class ManageTasksComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  TaskType = TaskType;
  selectAll: boolean = false;
  @Input() tasks: Task[] = [];
  allTasks: Task[] = [];
  @Input() selectedTaskType: string = '';
  person: Person | undefined;
  personId: string | undefined;

  taskTypes = Object.values(TaskType).filter(
    (value) => typeof value === 'string'
  );
  selectedPerson: Person | null = null;
  activePersons: Person[] = [];
  newTask: Task = {
    urltitle: '',
    description: '',
    taskType: this.selectedTaskType,
    completed: false,
    active: true,
    url: '',
  };

  constructor(
    private taskService: TaskService,
    private personService: PersonService,
    private selectedPersonService: SelectedPersonService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    this.newTask = {
      urltitle: '',
      description: '',
      taskType: this.selectedTaskType,
      completed: false,
      active: true,
      url: '',
    };
  }

  ngOnInit(): void {
    this.selectedPersonService
      .getPersonId()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((personId) => {
        this.personId = personId;
        console.log('PersonId:', this.personId);

        if (this.personId) {
          this.taskService
            .getTasksByPerson(+this.personId)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((tasks: Task[]) => {
              this.tasks = tasks;
              this.allTasks = tasks;
              console.log('Alla tasks för personen:', this.tasks);
            });

          this.personService
            .getPerson(+this.personId)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((person: Person) => {
              this.selectedPerson = person;
              console.log('SelectedPerson:', this.selectedPerson);
              this.cdr.detectChanges();
            });
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  filterTasksByTaskType(taskType: string) {
    if (this.personId) {
      this.personService
        .getPerson(+this.personId)
        .subscribe((person: Person) => {
          this.selectedPerson = person;
          if (this.selectedPerson) {
            this.taskService
              .getTasksByPersonAndType(this.selectedPerson.id, taskType)
              .subscribe((tasks: Task[]) => {
                this.tasks = tasks;
                if (this.selectedPerson) {
                  this.selectedPerson.tasks = tasks; // update selectedPerson tasks
                }
                console.log('Specifika tasks efter TaskType:', this.tasks);
              });
          } else {
            console.log('selectedPerson is not defined');
          }
        });
    }
  }

  createTask() {
    if (this.selectedPerson && this.selectedTaskType) {
      this.taskService
        .createTask(this.selectedPerson.id, this.selectedTaskType, this.newTask)
        .subscribe((task: Task) => {
          console.log('Created task:', task); // Add this line to print the created task
          this.selectedPerson?.tasks.push(task);
          this.newTask = {
            urltitle: '',
            description: '',
            taskType: this.selectedTaskType,
            completed: false,
            active: true,
            url: '',
          };
        });
    }
  }

  getNewestPersonId(): string {
    // TODO: Implement this function properly
    return '1'; // Placeholder
  }

  onCheckboxChange() {
    // Add your logic for handling the checkbox change event here
    console.log('Checkbox state changed');
  }


  deleteTask(personId: number, taskId: number): void {
    const dialogData = new ConfirmDialogModel(
      'Bekräfta borttagning',
      'Är du säker?'
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // If user clicked Yes, proceed with deletion
        this.taskService.deleteTask(personId, taskId).subscribe(() => {
          this.tasks = this.tasks.filter((task) => task.id !== taskId);
          console.log('Deleted task with id:', taskId);
        });
      }
    });
  }
}
