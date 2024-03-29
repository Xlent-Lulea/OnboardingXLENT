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
    const tasks = [] as PersonTask[];

    expect(component.calculateTaskProgress(tasks)).toEqual(0);
  });

  it('should calculate overall progress for one task to 0%', () => {
    const tasks = [{ isCompleted: false }] as PersonTask[];

    expect(component.calculateTaskProgress(tasks)).toEqual(0);
  });

  it('should calculate overall progress for multiple tasks to 0%', () => {
    const tasks = [
      { isCompleted: false },
      { isCompleted: false },
      { isCompleted: false },
      { isCompleted: false }
    ] as PersonTask[];

    expect(component.calculateTaskProgress(tasks)).toEqual(0);
  });

  it('should calculate overall progress for multiple tasks to 25%', () => {
    const tasks = [
      { isCompleted: false },
      { isCompleted: true },
      { isCompleted: false },
      { isCompleted: false }
    ] as PersonTask[];

    expect(component.calculateTaskProgress(tasks)).toEqual(25);
  });

  it('should calculate overall progress for one task to 100%', () => {
    const tasks = [{ isCompleted: true }] as PersonTask[];

    expect(component.calculateTaskProgress(tasks)).toEqual(100);
  });

  it('should calculate overall progress for multiple tasks to 100%', () => {
    const tasks = [
      { isCompleted: true },
      { isCompleted: true },
      { isCompleted: true },
      { isCompleted: true }
    ] as PersonTask[];

    expect(component.calculateTaskProgress(tasks)).toEqual(100);
  });
});
