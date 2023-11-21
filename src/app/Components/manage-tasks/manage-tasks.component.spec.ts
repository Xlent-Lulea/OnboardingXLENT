import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTasksComponent } from './manage-tasks.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FormErrorMessageComponent } from '../form-error-message/form-error-message.component';
import { MatIconModule } from '@angular/material/icon';

describe('ManageTasksComponent', () => {
  let component: ManageTasksComponent;
  let fixture: ComponentFixture<ManageTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageTasksComponent, FormErrorMessageComponent],
      imports: [
        HttpClientModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader, // Use TranslateFakeLoader for testing
          },
        }),
        MatIconModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ManageTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
