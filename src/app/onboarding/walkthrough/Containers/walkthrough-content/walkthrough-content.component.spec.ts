import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkthroughContentComponent } from './walkthrough-content.component';

describe('WalkthroughContentComponent', () => {
  let component: WalkthroughContentComponent;
  let fixture: ComponentFixture<WalkthroughContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalkthroughContentComponent]
    });
    fixture = TestBed.createComponent(WalkthroughContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
