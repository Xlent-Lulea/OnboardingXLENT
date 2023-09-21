import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePersonsComponent } from './manage-persons.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ManagePersonsComponent', () => {
  let component: ManagePersonsComponent;
  let fixture: ComponentFixture<ManagePersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagePersonsComponent],
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule
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
