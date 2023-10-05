import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselComponent } from './carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { PersonService } from 'src/app/services/person.service';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockPersonService: any;


  beforeEach(async () => {
    mockPersonService = {
      selectedPerson$: of({ name: 'Nibla Mörtsmelf' })
    };

    TestBed.configureTestingModule({
      declarations: [CarouselComponent],
      imports: [HttpClientModule],
      providers: [
        { provide: PersonService, useValue: mockPersonService }
      ]
    })
      .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should replace the PLACEHOLDER text in the title with the name from the observable', () => {

    fixture.detectChanges();


    const firstSlideTitle = fixture.debugElement.nativeElement.querySelector('.carousel-item:nth-child(1) h1').textContent;

    expect(firstSlideTitle).not.toContain('PLACEHOLDER');
    expect(firstSlideTitle).toContain('Nibla Mörtsmelf');
  });


  it('should navigate to the next slide', () => {
    component.isActive = 1;
    component.next();
    expect(component.isActive).toBe(2);
  });

  it('should navigate to the previous slide', () => {
    component.isActive = 2;
    component.pre();
    expect(component.isActive).toBe(1);
  });

  it('should loop to the first slide when reaching the last slide and clicking next', () => {
    component.isActive = component.slides.length;
    component.next();
    expect(component.isActive).toBe(1);
  });

  it('should loop to the last slide when at the first slide and clicking previous', () => {
    component.isActive = 1;
    component.pre();
    expect(component.isActive).toBe(component.slides.length);
  });


});



