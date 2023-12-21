import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TitleComponent } from 'src/app/Components/title/title.component';
import { WalkthroughComponent } from 'src/app/Components/walkthrough/walkthrough.component';
import { AboutComponent } from 'src/app/Components/about/about.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { PortraitsComponent } from 'src/app/Components/portraits/portraits.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PersonTask } from 'src/app/models/person-task.interface';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        TitleComponent,
        WalkthroughComponent,
        AboutComponent,
        PortraitsComponent
      ],
      imports: [
        MatCardModule,
        MatIconModule,
        HttpClientModule,
        MatProgressBarModule,
        MatSnackBarModule
      ],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate overall progress for zero tasks to 0%', () => {
    component.personTasks = [] as PersonTask[];

    expect(component.calculateOverallTaskProgress()).toEqual(0);
    expect(component.isAllTasksCompleted).toBeFalsy();
  });

  it('should calculate overall progress for one task to 0%', () => {
    component.personTasks = [{ isCompleted: false }] as PersonTask[];

    expect(component.calculateOverallTaskProgress()).toEqual(0);
    expect(component.isAllTasksCompleted).toBeFalsy();
  });

  it('should calculate overall progress for multiple tasks to 0%', () => {
    component.personTasks = [
      { isCompleted: false },
      { isCompleted: false },
      { isCompleted: false },
      { isCompleted: false }
    ] as PersonTask[];

    expect(component.calculateOverallTaskProgress()).toEqual(0);
    expect(component.isAllTasksCompleted).toBeFalsy();
  });

  it('should calculate overall progress for multiple tasks to 25%', () => {
    component.personTasks = [
      { isCompleted: false },
      { isCompleted: true },
      { isCompleted: false },
      { isCompleted: false }
    ] as PersonTask[];

    expect(component.calculateOverallTaskProgress()).toEqual(25);
    expect(component.isAllTasksCompleted).toBeFalsy();
  });

  it('should calculate overall progress for one task to 100%', () => {
    component.personTasks = [{ isCompleted: true }] as PersonTask[];

    expect(component.calculateOverallTaskProgress()).toEqual(100);
    expect(component.isAllTasksCompleted).toBeTruthy();
  });

  it('should calculate overall progress for multiple tasks to 100%', () => {
    component.personTasks = [
      { isCompleted: true },
      { isCompleted: true },
      { isCompleted: true },
      { isCompleted: true }
    ] as PersonTask[];

    expect(component.calculateOverallTaskProgress()).toEqual(100);
    expect(component.isAllTasksCompleted).toBeTruthy();
  });
});
