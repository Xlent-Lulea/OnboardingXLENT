import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit, AfterViewInit {
  @ViewChild('highlightPath', { static: false }) highlightPath!: ElementRef<SVGPathElement>;

  private pathLength = 0; // Will be set to the SVG path's length after view init
  litEllipseId: string | null = null;

  ellipseElements: HTMLElement[]; // This should be populated with actual elements
  currentEllipseIndex: number = 0; // Keeps track of the currently focused ellipse
  isScrollingToEllipse: boolean = false; // Flag to indicate if scrolling to an ellipse is in progress

  private onWindowScrollBound: any; // Function bound to this class context

  constructor() {
    this.ellipseElements = [];
    // Bind the onWindowScroll function to the component instance in the constructor
    this.onWindowScrollBound = this.onWindowScroll.bind(this);
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.ellipseElements = Array.from(document.querySelectorAll('.journey__ellipse'));

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

    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    const scrollPercentage = (scrollPosition / (docHeight - windowHeight)) * 100;
    const drawLength = this.pathLength - (this.pathLength * scrollPercentage) / 100;
    this.highlightPath.nativeElement.style.strokeDashoffset = String(Math.max(0, drawLength));

    this.litEllipseId = this.calculateLitEllipse(scrollPosition);
    this.updateEllipseClasses();
    console.log(scrollPosition);
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
      ellipse.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

      setTimeout(() => {
        this.isScrollingToEllipse = false;
        console.log(`Finished attempt to scroll to ellipse: `, ellipse);
      }, 600); // Adjust based on expected duration of the scroll animation
    } else {
      console.error('Invalid element passed to scrollToEllipse.');
    }
  }


  private calculateLitEllipse(scrollPosition: number): string | null {
    // Your logic to determine the ID of the ellipse that should light up based on the scroll position
    if (scrollPosition > 6000) {
      return 'journey__ellipse-22';

    } else if (scrollPosition > 5400) {
      return 'journey__ellipse-20';

    } else if (scrollPosition > 4528) {
      return 'journey__ellipse-21';

    } else if (scrollPosition > 3528) {
      return 'journey__ellipse-18';

    } else if (scrollPosition > 3000) {
      return 'journey__ellipse-17';

    } else if (scrollPosition > 2500) {
      return 'journey__ellipse-23';
    } else if (scrollPosition > 1200) {
      return 'journey__ellipse-15';
    } else if (scrollPosition > 600) {
      return 'journey__ellipse-14';
    } else if (scrollPosition > -1) {
      return 'journey__ellipse-13';

    }


    return null; // No ellipse is lit
  }

  private updateEllipseClasses(): void {
    // Query all ellipses and remove the 'lit' class
    document.querySelectorAll('.journey__ellipse').forEach((ellipse) => {
      ellipse.classList.remove('ellipse-lit');
    });

    if (this.litEllipseId) {
      document.querySelector('.' + this.litEllipseId)?.classList.add('ellipse-lit');
    }
  }

}

