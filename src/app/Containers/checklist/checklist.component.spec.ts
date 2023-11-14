import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistComponent } from './checklist.component';
import { HttpClientModule } from '@angular/common/http';
import { ExpansionPanelComponent } from 'src/app/Components/expansion-panel/expansion-panel.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ChecklistComponent', () => {
  let component: ChecklistComponent;
  let fixture: ComponentFixture<ChecklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChecklistComponent, ExpansionPanelComponent],
      imports: [HttpClientModule, MatSnackBarModule]
    });
    fixture = TestBed.createComponent(ChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
