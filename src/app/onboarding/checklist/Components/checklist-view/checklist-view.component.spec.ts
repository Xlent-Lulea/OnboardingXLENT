import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistViewComponent } from './checklist-view.component';

describe('ChecklistViewComponent', () => {
  let component: ChecklistViewComponent;
  let fixture: ComponentFixture<ChecklistViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChecklistViewComponent]
    });
    fixture = TestBed.createComponent(ChecklistViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
