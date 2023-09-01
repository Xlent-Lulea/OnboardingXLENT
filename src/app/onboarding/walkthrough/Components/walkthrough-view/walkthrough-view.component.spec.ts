import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkthroughViewComponent } from './walkthrough-view.component';

describe('WalkthroughViewComponent', () => {
  let component: WalkthroughViewComponent;
  let fixture: ComponentFixture<WalkthroughViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalkthroughViewComponent]
    });
    fixture = TestBed.createComponent(WalkthroughViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
