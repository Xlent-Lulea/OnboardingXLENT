import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkthroughComponent } from './walkthrough.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

describe('WalkthroughComponent', () => {
  let component: WalkthroughComponent;
  let fixture: ComponentFixture<WalkthroughComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalkthroughComponent],
      imports: [MatCardModule, MatIconModule]
    });
    fixture = TestBed.createComponent(WalkthroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
