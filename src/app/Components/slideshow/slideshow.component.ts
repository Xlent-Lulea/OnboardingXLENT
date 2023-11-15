import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  litEllipseId: string | null = null;

  ellipseElements: HTMLElement[]; // This should be populated with actual elements
  currentEllipseIndex: number = 0; // Keeps track of the currently focused ellipse
  isScrollingToEllipse: boolean = false; // Flag to indicate if scrolling to an ellipse is in progress
  private onWindowScrollBound: any; // Function bound to this class context

  @ViewChild('highlightPath') highlightPath!: ElementRef;
  private pathLength!: number;

  private ellipseDashOffsets: number[] = [10000, 8150, 7100, 5700, 4410, 3300, 2000, 740,0]; // Example values, adjust to match your path


  constructor(private el: ElementRef) {
    this.ellipseElements = [];
    // Bind the onWindowScroll function to the component instance in the constructor
    this.onWindowScrollBound = this.onWindowScroll.bind(this);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.ellipseElements = Array.from(document.querySelectorAll('.journey__ellipse'))

    // setTimeout here is used to ensure that the DOM updates have been processed.
    setTimeout(() => {
      this.pathLength = this.highlightPath.nativeElement.getTotalLength();
      this.highlightPath.nativeElement.style.strokeDasharray = `${this.pathLength}`;
      this.highlightPath.nativeElement.style.strokeDashoffset = `${this.pathLength}`;
    });

    // Add event listener when the component's view is initialized
    window.addEventListener('wheel', this.onWindowScrollBound, { passive: false });
  }

  ngOnDestroy() {
    // Remove event listener when the component is destroyed
    window.removeEventListener('wheel', this.onWindowScrollBound);


  }

  // Your onWindowScroll event is now separate and can be correctly bound or unbound from the event listener.
  onWindowScroll(event: WheelEvent): void {
    if (event.cancelable) {
      event.preventDefault();
      this.handleScroll(event);
    }




  }

  // Refactored scrolling logic into its own method for clarity
  private handleScroll(event: WheelEvent): void {
    console.log('handleScroll triggered'); // Confirm that the method is called

    if (this.isScrollingToEllipse) {
      console.log('Currently animating to another ellipse');
      return;
    }




    const delta = event.deltaY;
    const nextEllipseClassName = this.determineNextEllipseId(delta).split(' ').pop(); // Use only the unique part
    console.log(`Determined next ellipse class: ${nextEllipseClassName}`);

    const nextEllipse = document.querySelector(`.${nextEllipseClassName}`);
    console.log('Next ellipse element:', nextEllipse);

    if (nextEllipse instanceof HTMLElement) {
      console.log('Calling scrollToEllipse with:', nextEllipse);
      this.scrollToEllipse(nextEllipse);
    } else {
      console.error('No next ellipse found or not an HTMLElement');
    }
    this.updatePathDrawing();

    setTimeout(() => {
      this.updateEllipseClasses();
    },600);

  }


  private updatePathDrawing(): void {
    const dashOffset = this.ellipseDashOffsets[this.currentEllipseIndex];
    // Ensure dashOffset is within the path length
    const adjustedDashOffset = Math.min(dashOffset, this.pathLength);
    this.highlightPath.nativeElement.style.strokeDashoffset = adjustedDashOffset.toString();
  }

  private determineNextEllipseId(delta: number): string {
    const direction = delta > 0 ? 1 : -1;
    let nextIndex = this.currentEllipseIndex + direction;

    // Bounds check
    nextIndex = Math.max(0, Math.min(nextIndex, this.ellipseElements.length - 1));

    console.log(`Current index: ${this.currentEllipseIndex}, Next index: ${nextIndex}, Direction: ${direction}`);

    // Only update the current index if it's different
    if (nextIndex !== this.currentEllipseIndex) {
      this.currentEllipseIndex = nextIndex;
      const nextEllipse = this.ellipseElements[nextIndex];
      console.log(`Next Ellipse: ${nextEllipse.className}`);
      return nextEllipse.className;
    } else {
      // If the index hasn't changed, return the current ellipse's class name
      return this.ellipseElements[this.currentEllipseIndex].className;
    }
  }

  private scrollToEllipse(ellipse: HTMLElement): void {
    if (ellipse) {
      console.log(`Attempting to scroll to ellipse: `, ellipse);

      this.isScrollingToEllipse = true;
      ellipse.scrollIntoView({ behavior: 'smooth', block: 'center' });

      setTimeout(() => {
        this.isScrollingToEllipse = false;
        console.log(`Finished attempt to scroll to ellipse: `, ellipse);

      }, 600); // Adjust based on expected duration of the scroll animation
    } else {
      console.error('Invalid element passed to scrollToEllipse.');
    }
  }




  private updateEllipseClasses(): void {
    // Remove 'ellipse-lit' class from all ellipses
    this.ellipseElements.forEach(ellipse => {
      ellipse.classList.remove('ellipse-lit');
    });

    // Add 'ellipse-lit' class to the currently focused ellipse
    if (this.ellipseElements[this.currentEllipseIndex]) {
      this.ellipseElements[this.currentEllipseIndex].classList.add('ellipse-lit');
    }
  }

}

