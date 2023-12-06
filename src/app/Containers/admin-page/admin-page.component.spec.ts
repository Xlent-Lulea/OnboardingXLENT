import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageComponent } from './admin-page.component';
import { ManageTasksComponent } from 'src/app/Components/manage-tasks/manage-tasks.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ManagePersonsComponent } from 'src/app/Components/manage-persons/manage-persons.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ManageTasktypesComponent } from 'src/app/Components/manage-tasktypes/manage-tasktypes.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormErrorMessageComponent } from 'src/app/Components/form-error-message/form-error-message.component';
import { MatIconModule } from '@angular/material/icon';
import { Person } from 'src/app/models/person.interface';
import { PersonService } from 'src/app/services/person.service';
import { TaskService } from 'src/app/services/task.service';
import { TaskTypeService } from 'src/app/services/tasktype.service';
import { By } from '@angular/platform-browser';
import { Task } from 'src/app/models/task.interface';
import { TaskType } from 'src/app/models/task-type.interface';
import { of } from 'rxjs';

describe('AdminPageComponent', () => {
  let component: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;

  let personService: PersonService;
  let taskService: TaskService;
  let taskTypeService: TaskTypeService;

  let managePersonComponent: ManagePersonsComponent;
  let managePersonFixture: ComponentFixture<ManagePersonsComponent>;

  let manageTaskComponent: ManageTasksComponent;
  let manageTaskFixture: ComponentFixture<ManageTasksComponent>;

  let manageTasktypesComponent: ManageTasktypesComponent;
  let manageTasktypesFixture: ComponentFixture<ManageTasktypesComponent>;
  const taskTypeToHandle: TaskType = { id: 0 } as TaskType;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AdminPageComponent,
        ManageTasksComponent,
        ManagePersonsComponent,
        ManageTasktypesComponent,
        FormErrorMessageComponent
      ],
      imports: [
        HttpClientModule,
        RouterModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader, // Use TranslateFakeLoader for testing
          },
        }),
        MatSnackBarModule,
        MatIconModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            // Mock any properties or methods you need here
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  // Provide mock data for paramMap
                  if (key === 'yourParam') {
                    return 'mockedParamValue';
                  }
                  return null; // Return null for other keys if needed
                },
              },
            },
          },
        },
        PersonService,
        TaskService,
        TaskTypeService
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminPageComponent);
    component = fixture.componentInstance;

    personService = TestBed.inject(PersonService);
    spyOn(personService, 'create');
    spyOn(personService, 'update');
    spyOn(personService, 'remove');

    taskService = TestBed.inject(TaskService);
    spyOn(taskService, 'create');
    spyOn(taskService, 'update');
    spyOn(taskService, 'remove');

    taskTypeService = TestBed.inject(TaskTypeService);
    spyOn(taskTypeService, 'create').and.returnValue(of(taskTypeToHandle));
    spyOn(taskTypeService, 'update');
    spyOn(taskTypeService, 'delete');

    managePersonFixture = TestBed.createComponent(ManagePersonsComponent);
    manageTaskFixture = TestBed.createComponent(ManageTasksComponent);
    manageTasktypesFixture = TestBed.createComponent(ManageTasktypesComponent);

    fixture.detectChanges();
    managePersonFixture.detectChanges();
    manageTaskFixture.detectChanges();
    manageTasktypesFixture.detectChanges();

    managePersonComponent = fixture.debugElement.query(By.directive(ManagePersonsComponent)).componentInstance;
    manageTaskComponent = fixture.debugElement.query(By.directive(ManageTasksComponent)).componentInstance;
    manageTasktypesComponent = fixture.debugElement.query(By.directive(ManageTasktypesComponent)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(managePersonComponent).toBeTruthy();
    expect(manageTaskComponent).toBeTruthy();
    expect(manageTasktypesComponent).toBeTruthy();
  });

  it('should handle person create', () => {
    // Trigger the event output from ManagePersonComponent
    const personToCreate: Person = { id: 0 } as Person;
    managePersonComponent.createPerson.emit(personToCreate);

    expect(personService.create).toHaveBeenCalledOnceWith(personToCreate);
  });

  it('should handle person update', () => {
    // Trigger the event output from ManagePersonComponent
    const personToUpdate: Person = { id: 0 } as Person;
    managePersonComponent.updatePerson.emit(personToUpdate);

    expect(personService.update).toHaveBeenCalledOnceWith(personToUpdate);
  });

  it('should handle person remove', () => {
    // Trigger the event output from ManagePersonComponent
    const personToRemove: Person = { id: 0 } as Person;
    managePersonComponent.removePerson.emit(personToRemove.id);

    expect(personService.remove).toHaveBeenCalledOnceWith(personToRemove.id);
  });

  it('should handle task create', () => {
    // Trigger the event output from ManageTaskComponent
    const taskToCreate: Task = { id: 0 } as Task;
    manageTaskComponent.createTask.emit(taskToCreate);

    expect(taskService.create).toHaveBeenCalledOnceWith(taskToCreate);
  });

  it('should handle task update', () => {
    // Trigger the event output from ManageTaskComponent
    const taskToUpdate: Task = { id: 0 } as Task;
    manageTaskComponent.updateTask.emit(taskToUpdate);

    expect(taskService.update).toHaveBeenCalledOnceWith(taskToUpdate);
  });

  it('should handle task remove', () => {
    // Trigger the event output from ManageTaskComponent
    const taskToRemove: Task = { id: 0 } as Task;
    manageTaskComponent.removeTask.emit(taskToRemove.id);

    expect(taskService.remove).toHaveBeenCalledOnceWith(taskToRemove.id);
  });

  it('should handle taskType create', () => {
    // Trigger the event output from ManageTasktypesComponent
    manageTasktypesComponent.createTaskType.emit(taskTypeToHandle);

    expect(taskTypeService.create).toHaveBeenCalledOnceWith(taskTypeToHandle);
    expect(component.taskTypes).toContain(taskTypeToHandle);
  });

  it('should handle taskType update', () => {
    // Trigger the event output from ManageTasktypesComponent
    manageTasktypesComponent.updateTaskType.emit(taskTypeToHandle);

    expect(taskTypeService.update).toHaveBeenCalledOnceWith(taskTypeToHandle);
  });

  it('should handle taskType delete', () => {
    // Trigger the event output from ManageTasktypesComponent
    manageTasktypesComponent.deleteTaskType.emit(taskTypeToHandle.id);

    expect(taskTypeService.delete).toHaveBeenCalledOnceWith(taskTypeToHandle.id);
  });
});
