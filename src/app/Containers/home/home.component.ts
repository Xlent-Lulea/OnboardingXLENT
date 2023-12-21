import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { tap } from 'rxjs';
import { PersonTask } from 'src/app/models/person-task.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  personTasks: PersonTask[] = [];
  isAllTasksCompleted = false; // Initialize as false
  personId: string | null;

  constructor(private personService: PersonService, private cdr: ChangeDetectorRef) {
    this.personId = localStorage.getItem('personId');

    if (!this.personId) {
      return;
    }

    this.personService.getTasksByPersonId(+this.personId).pipe(
      tap((tasks) => {
        this.personTasks = tasks || [];
      }),
    ).subscribe();
  }

  ngAfterViewInit(): void {
    this.calculateOverallTaskProgress();
    this.cdr.detectChanges();  // manually trigger change detection
  }

  calculateOverallTaskProgress(): number {
    const totalTasksCount = this.personTasks.length;
    const completedTasksCount = this.personTasks.filter((task) => task.isCompleted).length;

    // Check if all tasks are completed
    this.isAllTasksCompleted = completedTasksCount === totalTasksCount && totalTasksCount > 0;

    const percentage = totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;
    return Math.trunc(percentage);
  }
}
