import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorMessageComponent } from './form-error-message.component';

describe('FormErrorMessageComponent', () => {
  let component: FormErrorMessageComponent;
  let fixture: ComponentFixture<FormErrorMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormErrorMessageComponent]
    });
    fixture = TestBed.createComponent(FormErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
