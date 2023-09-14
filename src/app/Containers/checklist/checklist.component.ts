import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/task.interface';
import { Observable, tap } from 'rxjs';



@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  providers: [TaskService]
})



export class ChecklistComponent {
  selectedPerson$: Observable<Person | null> = this.personService.selectedPerson$.pipe(
    tap((person) =>  console.log ('selectedPerson', person) )
  );

  constructor(private taskService: TaskService,
              private personService: PersonService) { }




}
