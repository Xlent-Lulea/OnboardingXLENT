import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ManageTasktypesComponent } from './manage-tasktypes.component';

describe('ManageTasktypesComponent', () => {
  let component: ManageTasktypesComponent;
  let fixture: ComponentFixture<ManageTasktypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageTasktypesComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageTasktypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
