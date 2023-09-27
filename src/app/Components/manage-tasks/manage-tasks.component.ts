//task-list.component.ts
import { Component, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.interface';
import { TaskType } from 'src/app/models/task.interface';
import { PersonService } from 'src/app/services/person.service';
import { Person } from 'src/app/models/task.interface';
import { Observable, Subject } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-manage-tasks',
  templateUrl: './manage-tasks.component.html',
  styleUrls: ['./manage-tasks.component.scss'],
})
export class ManageTasksComponent {
  private ngUnsubscribe = new Subject<void>();
  TaskType = TaskType;
  @Input() tasks: Task[] = [];
  allTasks: Task[] = [];
  @Input() selectedTaskType!: TaskType;
  person: Person | undefined;
  personId: string | undefined;

  selectedPerson$: Observable<Person | null> = this.personService.selectedPerson$;


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
                  this.selectedPerson.taskEntities = tasks; // update selectedPerson tasks
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
          this.selectedPerson?.taskEntities.push(task);
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
