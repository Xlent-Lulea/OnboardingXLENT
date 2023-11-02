import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientModule, RouterModule, MatSnackBarModule],
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
      ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
