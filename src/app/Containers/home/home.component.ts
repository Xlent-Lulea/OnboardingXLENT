import { Component } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { Task, Person } from 'src/app/models/task.interface';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent {
  selectedPerson$: Observable<Person | null> =
    this.personService.selectedPerson$;
  tasks$: Observable<Task[]> = this.selectedPerson$.pipe(
    map((person) => person?.taskEntities || [])
  );
  isAllTasksCompleted = false; // Initialize as false

  constructor(private personService: PersonService) {}

  calculateOverallTaskProgress(): number {
    let totalTasksCount = 0;
    let completedTasksCount = 0;

    this.tasks$.subscribe((tasks) => {
      totalTasksCount = tasks.length;
      completedTasksCount = tasks.filter((task) => task.completed).length;

      // Check if all tasks are completed
      this.isAllTasksCompleted = completedTasksCount === totalTasksCount;
    });

    return totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;
  }
}
