import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksComponent } from './links.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

describe('LinksComponent', () => {
  let component: LinksComponent;
  let fixture: ComponentFixture<LinksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinksComponent],
      imports: [MatCardModule, MatListModule]
    });
    fixture = TestBed.createComponent(LinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
