import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkContentComponent } from './link-content.component';

describe('LinkContentComponent', () => {
  let component: LinkContentComponent;
  let fixture: ComponentFixture<LinkContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkContentComponent]
    });
    fixture = TestBed.createComponent(LinkContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
