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


  constructor() {
    this.ellipseElements = [];
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
  }

  @HostListener('window:wheel', ['$event'])
  onWindowScroll(event: WheelEvent): void { // Type the parameter as WheelEvent, not optional
    if (event.cancelable) {
      event.preventDefault();
      // ... the rest of your logic



    if (this.isScrollingToEllipse) {
      return;
    }

    const delta = event.deltaY;
    const nextEllipseId = this.determineNextEllipseId(delta);
    this.scrollToEllipse(nextEllipseId);



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
  }

  private determineNextEllipseId(delta: number): string {
    // Determine the direction of scrolling
    const direction = delta > 0 ? 1 : -1; // '1' for down, '-1' for up

    // Calculate next index based on the current index and scroll direction
    let nextIndex = this.currentEllipseIndex + direction;

    // Ensure nextIndex is within bounds
    nextIndex = Math.max(0, Math.min(nextIndex, this.ellipseElements.length - 1));

    // Save the next index as the current index for future scrolls
    this.currentEllipseIndex = nextIndex;

    // Return the ID of the next ellipse
    return this.ellipseElements[nextIndex].id;
  }

  private scrollToEllipse(ellipseId: string): void {
    const ellipse = document.getElementById(ellipseId);
    if (ellipse) {
      this.isScrollingToEllipse = true; // Set the flag to indicate scrolling is in progress

      ellipse.scrollIntoView({ behavior: 'smooth' });

      // Reset the flag after the scroll animation is complete
      // This could be done after a fixed timeout or by listening for a scroll end event
      setTimeout(() => {
        this.isScrollingToEllipse = false;
      }, 600); // Assuming 600ms is your smooth scroll duration
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

