import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionPanelComponent } from './expansion-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonTask } from 'src/app/models/person-task.interface';

describe('ExpansionPanelComponent', () => {
  let component: ExpansionPanelComponent;
  let fixture: ComponentFixture<ExpansionPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpansionPanelComponent],
      imports: [HttpClientModule, MatExpansionModule, MatProgressBarModule, BrowserAnimationsModule]
    });
    fixture = TestBed.createComponent(ExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate progress for zero tasks to 0%', () => {
    component.personTasks = [] as PersonTask[];
    component.calculateTaskProgress();

    expect(component.taskPercent).toEqual(0);
  });

  it('should calculate progress for one task to 0%', () => {
    component.personTasks = [{ isCompleted: false }] as PersonTask[];
    component.calculateTaskProgress();

    expect(component.taskPercent).toEqual(0);
  });

  it('should calculate progress for multiple tasks to 0%', () => {
    component.personTasks = [
      { isCompleted: false },
      { isCompleted: false },
      { isCompleted: false },
      { isCompleted: false }
    ] as PersonTask[];
    component.calculateTaskProgress();

    expect(component.taskPercent).toEqual(0);
  });

  it('should calculate progress for multiple tasks to 25%', () => {
    component.personTasks = [
      { isCompleted: false },
      { isCompleted: true },
      { isCompleted: false },
      { isCompleted: false }
    ] as PersonTask[];
    component.calculateTaskProgress();

    expect(component.taskPercent).toEqual(25);
  });

  it('should calculate progress for one task to 100%', () => {
    component.personTasks = [{ isCompleted: true }] as PersonTask[];
    component.calculateTaskProgress();

    expect(component.taskPercent).toEqual(100);
  });

  it('should calculate progress for multiple tasks to 100%', () => {
    component.personTasks = [
      { isCompleted: true },
      { isCompleted: true },
      { isCompleted: true },
      { isCompleted: true }
    ] as PersonTask[];
    component.calculateTaskProgress();

    expect(component.taskPercent).toEqual(100);
  });
});
