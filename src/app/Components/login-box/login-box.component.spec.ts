import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBoxComponent } from './login-box.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginBoxComponent', () => {
  let component: LoginBoxComponent;
  let fixture: ComponentFixture<LoginBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginBoxComponent],
      imports: [MatFormFieldModule, MatSelectModule, BrowserAnimationsModule]
    });
    fixture = TestBed.createComponent(LoginBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
