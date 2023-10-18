import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTasktypesComponent } from './manage-tasktypes.component';

describe('ManageTasktypesComponent', () => {
  let component: ManageTasktypesComponent;
  let fixture: ComponentFixture<ManageTasktypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageTasktypesComponent]
    });
    fixture = TestBed.createComponent(ManageTasktypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
