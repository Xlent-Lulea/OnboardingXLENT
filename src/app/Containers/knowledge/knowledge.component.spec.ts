import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeComponent } from './knowledge.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

describe('KnowledgeComponent', () => {
  let component: KnowledgeComponent;
  let fixture: ComponentFixture<KnowledgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KnowledgeComponent],
      imports: [MatExpansionModule, MatListModule, BrowserAnimationsModule, MatIconModule]
    });
    fixture = TestBed.createComponent(KnowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
