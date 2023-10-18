import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxDialogComponent } from './box-dialog.component';

describe('BoxDialogComponent', () => {
  let component: BoxDialogComponent;
  let fixture: ComponentFixture<BoxDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoxDialogComponent]
    });
    fixture = TestBed.createComponent(BoxDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
