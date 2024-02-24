import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistComponent } from './checklist.component';
import { HttpClientModule } from '@angular/common/http';
import { ExpansionPanelComponent } from 'src/app/Components/expansion-panel/expansion-panel.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PersonTask } from 'src/app/models/person-task.interface';
import { TaskType } from 'src/app/models/task-type.interface';
import { PersonService } from 'src/app/services/person.service';
import { By } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Person } from 'src/app/models/person.interface';

describe('ChecklistComponent', () => {
  let component: ChecklistComponent;
  let fixture: ComponentFixture<ChecklistComponent>;

  let expansionPanelComponent: ExpansionPanelComponent;
  let expansionPanelFixture: ComponentFixture<ExpansionPanelComponent>;
  let personService: PersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChecklistComponent, ExpansionPanelComponent],
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatProgressBarModule,
        BrowserAnimationsModule
      ],
      providers: [PersonService]
    });
    fixture = TestBed.createComponent(ChecklistComponent);
    component = fixture.componentInstance;

    // At least one taskType and a defined personId in order to initialize an ExpansionPanelComponent
    component.taskTypes = [
      {}
    ] as TaskType[];
    component.person = {} as Person;

    personService = TestBed.inject(PersonService);
    spyOn(personService, 'updateTaskCompletionStatus');
    expansionPanelFixture = TestBed.createComponent(ExpansionPanelComponent);

    fixture.detectChanges();
    expansionPanelFixture.detectChanges();

    expansionPanelComponent =
      fixture.debugElement.query(By.directive(ExpansionPanelComponent)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(expansionPanelComponent).toBeTruthy();
  });

  it('should handle task completion', () => {
    // Trigger the event output from ExpansionPanelComponent
    const taskToComplete: PersonTask = { id: 3, isCompleted: false } as PersonTask;
    expansionPanelComponent.taskStatusChanged.emit(taskToComplete);

    expect(personService.updateTaskCompletionStatus).toHaveBeenCalledOnceWith(taskToComplete.id);
  });
});
