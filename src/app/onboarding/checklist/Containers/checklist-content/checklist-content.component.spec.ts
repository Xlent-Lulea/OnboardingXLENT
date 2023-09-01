import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistContentComponent } from './checklist-content.component';

describe('ChecklistContentComponent', () => {
  let component: ChecklistContentComponent;
  let fixture: ComponentFixture<ChecklistContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChecklistContentComponent]
    });
    fixture = TestBed.createComponent(ChecklistContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
