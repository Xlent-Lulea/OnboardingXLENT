import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortraitsComponent } from './portraits.component';

describe('PortraitsComponent', () => {
  let component: PortraitsComponent;
  let fixture: ComponentFixture<PortraitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortraitsComponent],
    });
    fixture = TestBed.createComponent(PortraitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
