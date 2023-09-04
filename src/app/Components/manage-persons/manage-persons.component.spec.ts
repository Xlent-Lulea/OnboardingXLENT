import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePersonsComponent } from './manage-persons.component';

describe('ManagePersonComponent', () => {
  let component: ManagePersonsComponent;
  let fixture: ComponentFixture<ManagePersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePersonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
