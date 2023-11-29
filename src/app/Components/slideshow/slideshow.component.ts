import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
})
export class SlideshowComponent implements AfterViewInit, OnDestroy {
  litEllipseId: string | null = null;

  ellipseElements: HTMLElement[];
  currentEllipseIndex = 0;
  isScrollingToEllipse = false;
  private onWindowScrollBound;

  @ViewChild('highlightPath') highlightPath!: ElementRef;
  private pathLength!: number;

  private ellipseDashOffsets: number[] = [
    10000, 8150, 7100, 5700, 4410, 3300, 2000, 740, 0,
  ];

  constructor(private el: ElementRef) {
    this.ellipseElements = [];
    this.onWindowScrollBound = this.onWindowScroll.bind(this);
  }

  ngAfterViewInit() {
    this.ellipseElements = Array.from(
      document.querySelectorAll('.journey__ellipse')
    );

    setTimeout(() => {
      this.pathLength = this.highlightPath.nativeElement.getTotalLength();
      this.highlightPath.nativeElement.style.strokeDasharray = `${this.pathLength}`;
      this.highlightPath.nativeElement.style.strokeDashoffset = `${this.pathLength}`;
    });

    window.addEventListener('wheel', this.onWindowScrollBound, {
      passive: false,
    });
  }

  ngOnDestroy() {
    window.removeEventListener('wheel', this.onWindowScrollBound);
  }

  onWindowScroll(event: WheelEvent): void {
    if (event.cancelable) {
      event.preventDefault();
      this.handleScroll(event);
    }
  }

  private handleScroll(event: WheelEvent): void {

    const delta = event.deltaY;
    const nextEllipseClassName = this.determineNextEllipseId(delta)
      .split(' ')
      .pop();

    const nextEllipse = document.querySelector(`.${nextEllipseClassName}`);

    if (nextEllipse instanceof HTMLElement) {
      this.scrollToEllipse(nextEllipse);
    }

    this.updatePathDrawing();

    setTimeout(() => {
      this.updateEllipseClasses();
    }, 600);
  }

  private updatePathDrawing(): void {
    const dashOffset = this.ellipseDashOffsets[this.currentEllipseIndex];
    const adjustedDashOffset = Math.min(dashOffset, this.pathLength);
    this.highlightPath.nativeElement.style.strokeDashoffset =
      adjustedDashOffset.toString();
  }

  private determineNextEllipseId(delta: number): string {
    const direction = delta > 0 ? 1 : -1;
    let nextIndex = this.currentEllipseIndex + direction;

    nextIndex = Math.max(
      0,
      Math.min(nextIndex, this.ellipseElements.length - 1)
    );

    if (nextIndex !== this.currentEllipseIndex) {
      this.currentEllipseIndex = nextIndex;
      const nextEllipse = this.ellipseElements[nextIndex];
      return nextEllipse.className;
    } else {
      return this.ellipseElements[this.currentEllipseIndex].className;
    }
  }

  private scrollToEllipse(ellipse: HTMLElement): void {
    if (ellipse) {
      this.isScrollingToEllipse = true;
      ellipse.scrollIntoView({ behavior: 'smooth', block: 'center' });

      setTimeout(() => {
        this.isScrollingToEllipse = false;
      }, 600);
    }
  }

  private updateEllipseClasses(): void {
    this.ellipseElements.forEach((ellipse) => {
      ellipse.classList.remove('ellipse-lit');
    });

    if (this.ellipseElements[this.currentEllipseIndex]) {
      this.ellipseElements[this.currentEllipseIndex].classList.add(
        'ellipse-lit'
      );
    }
  }
}
