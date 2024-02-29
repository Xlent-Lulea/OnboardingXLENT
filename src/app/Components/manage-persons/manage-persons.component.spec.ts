import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePersonsComponent } from './manage-persons.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormErrorMessageComponent } from '../form-error-message/form-error-message.component';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

describe('ManagePersonsComponent', () => {
  let component: ManagePersonsComponent;
  let fixture: ComponentFixture<ManagePersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagePersonsComponent, FormErrorMessageComponent],
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatRadioModule
      ]
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
