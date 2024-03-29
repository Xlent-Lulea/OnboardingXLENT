import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageTasktypesComponent } from './manage-tasktypes.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormErrorMessageComponent } from '../form-error-message/form-error-message.component';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';


describe('ManageTasktypesComponent', () => {
  let component: ManageTasktypesComponent;
  let fixture: ComponentFixture<ManageTasktypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageTasktypesComponent, FormErrorMessageComponent],
      imports: [
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatIconModule,
        MatRadioModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageTasktypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
