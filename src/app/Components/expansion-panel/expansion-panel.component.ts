import { Component, ViewChild, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task, TaskType } from '../../models/task.interface';
import { Input } from '@angular/core';
import { Person } from 'src/app/models/task.interface';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { SelectedPersonService, PersonService } from 'src/app/services/person.service';

/**
 * @title Accordion with expand/collapse all toggles
 */
@Component({
  selector: 'app-expansion-panel',
  templateUrl: 'expansion-panel.component.html',
  styleUrls: ['expansion-panel.component.scss'],
})
export class ExpansionPanelComponent implements OnInit {
  constructor(private taskService: TaskService,
              private selectedPersonService: SelectedPersonService,
              private personService: PersonService) {}
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  tasksByType: { [key in TaskType]?: Task[] } = {};
  taskTypes: TaskType[] = Object.values(TaskType).filter(
    (value) => typeof value === 'string'
  ) as TaskType[];
  @Input() selectedTaskType: string = '';
  selectedPersonId!: string;
  selectedPerson!: Person;
  // ... your interface and enum definitions ...§

  shouldShowDivider(task: Task, index: number, tasks: Task[]): boolean {
    if (index === 0) return false;
    return tasks[index - 1].taskType === task.taskType;
  }

  ngOnInit() {
    this.subscribeToSelectedPersonId();
  }

  subscribeToSelectedPersonId(): void {
    this.selectedPersonService.getPersonId().subscribe(personId => {
      this.selectedPersonId = personId;
      this.fetchPersonDetails();
    });
  }
  fetchPersonDetails(): void {
    if(this.selectedPersonId) {
      this.personService.getPerson(+this.selectedPersonId).subscribe(person => {
        this.selectedPerson = person;
      });
    }
  }

  fetchTasksByType(taskType: TaskType, personId: number): void {
    this.taskService
      .getTasksByPersonAndType(personId, taskType as unknown as string)
      .subscribe((tasks: Task[]) => {
        console.log('Tasks for type', taskType, tasks);
        this.tasksByType[taskType] = tasks;
      });
  }
}
