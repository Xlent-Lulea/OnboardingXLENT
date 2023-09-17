import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselComponent } from './carousel.component';
import { HelloComponent } from './hello.component';
import { By } from '@angular/platform-browser';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselComponent, HelloComponent]
    });
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('next() should add 1 to isActive', () => {
    // Arrange
    let originalValue = component.isActive;

    // Act
    component.next();

    // Assert
    expect(component.isActive).toEqual(++originalValue);
  });

  it('next() should return to first page when on last page', () => {
    // Arrange
    component.isActive = 8;
    fixture.detectChanges();

    // Act
    component.next();

    //Assert
    expect(component.isActive).toEqual(1);
  });

  it('should display 2/8 when next() is executed', () => {
    // Arrange

    // Act
    component.next();
    fixture.detectChanges();
    // Assert
    const result = fixture.debugElement.query(By.css('.activeNr')).nativeElement;
    expect(result.innerHTML).toBe('2/8');
  });
});
