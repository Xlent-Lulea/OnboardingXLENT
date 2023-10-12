import { Component } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { Observable, tap } from 'rxjs';
import { Person } from 'src/app/models/person.interface';
import { PersonTask } from 'src/app/models/person-task.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent {
  selectedPerson$: Observable<Person | null> =
    this.personService.selectedPerson$;

  personTasks: PersonTask[] = [];
  isAllTasksCompleted = false; // Initialize as false

  constructor(private personService: PersonService) {
    const storedPersonId = localStorage.getItem('personId') || '';

    this.personService.getTasksByPersonId(+storedPersonId).pipe(
      tap((tasks) => {
        this.personTasks = tasks || [];
        this.calculateOverallTaskProgress();
      }),
    ).subscribe();
  }

  calculateOverallTaskProgress(): number {
     const totalTasksCount = this.personTasks.length;
     const completedTasksCount = this.personTasks.filter((task) => task.isCompleted).length;

      // Check if all tasks are completed
      this.isAllTasksCompleted = completedTasksCount === totalTasksCount;



    const percentage = totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;

    return Math.trunc(percentage);
    }
}
