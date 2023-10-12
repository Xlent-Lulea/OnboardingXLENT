import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TitleComponent } from 'src/app/Components/title/title.component';
import { WalkthroughComponent } from 'src/app/Components/walkthrough/walkthrough.component';
import { AboutComponent } from 'src/app/Components/about/about.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { PortraitsComponent } from 'src/app/Components/portraits/portraits.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        TitleComponent,
        WalkthroughComponent,
        AboutComponent,
        PortraitsComponent
      ],
      imports: [MatCardModule, MatIconModule, HttpClientModule, MatProgressBarModule],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
