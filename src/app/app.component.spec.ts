import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent],
    imports: [
      HttpClientModule,
      RouterModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      BrowserAnimationsModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: TranslateFakeLoader, // Use TranslateFakeLoader for testing
        },
      }),
      MatSnackBarModule
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
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'OnboardingXLENT'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('OnboardingXLENT');
  });
});
