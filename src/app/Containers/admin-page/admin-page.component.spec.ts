import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageComponent } from './admin-page.component';
import { ManageTasksComponent } from 'src/app/Components/manage-tasks/manage-tasks.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ManagePersonsComponent } from 'src/app/Components/manage-persons/manage-persons.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

describe('AdminPageComponent', () => {
  let component: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPageComponent, ManageTasksComponent, ManagePersonsComponent],
      imports: [
        HttpClientModule,
        RouterModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader, // Use TranslateFakeLoader for testing
          },
        })
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            // Mock any properties or methods you need here
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  // Provide mock data for paramMap
                  if (key === 'yourParam') {
                    return 'mockedParamValue';
                  }
                  return null; // Return null for other keys if needed
                },
              },
            },
          },
        }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
