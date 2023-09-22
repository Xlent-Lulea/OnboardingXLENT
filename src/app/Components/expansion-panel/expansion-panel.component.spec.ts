import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionPanelComponent } from './expansion-panel.component';
import { HttpClientModule } from '@angular/common/http';

describe('ExpansionPanelComponent', () => {
  let component: ExpansionPanelComponent;
  let fixture: ComponentFixture<ExpansionPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpansionPanelComponent],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(ExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
