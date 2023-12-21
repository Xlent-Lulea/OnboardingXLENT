import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginBoxComponent } from 'src/app/Components/login-box/login-box.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PersonService } from 'src/app/services/person.service';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.interface';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let personService: PersonService;
  let loginBoxComponent: LoginBoxComponent;
  let loginBoxFixture: ComponentFixture<LoginBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, LoginBoxComponent],
      imports: [
        HttpClientModule,
        MatFormFieldModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatSnackBarModule
      ],
      providers: [PersonService]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    personService = TestBed.inject(PersonService);
    spyOn(personService, 'updateSelectedPerson');
    loginBoxFixture = TestBed.createComponent(LoginBoxComponent);

    fixture.detectChanges();
    loginBoxFixture.detectChanges();

    loginBoxComponent = fixture.debugElement.query(By.directive(LoginBoxComponent)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(loginBoxComponent).toBeTruthy();
  });

  it('should handle login', () => {
    // Trigger the event output from LoginBoxComponent
    const personToLogin: Person = { id: 0 } as Person;
    loginBoxComponent.selectPerson.emit(personToLogin);

    expect(personService.updateSelectedPerson).toHaveBeenCalledOnceWith(personToLogin);
  });
});
