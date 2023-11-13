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


  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    // setTimeout here is used to ensure that the DOM updates have been processed.
    setTimeout(() => {
      this.pathLength = this.highlightPath.nativeElement.getTotalLength();
      this.highlightPath.nativeElement.style.strokeDasharray = `${this.pathLength}`;
      this.highlightPath.nativeElement.style.strokeDashoffset = `${this.pathLength}`;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {

    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;


    const scrollPercentage = (scrollPosition / (docHeight - windowHeight)) * 103;
    const drawLength = this.pathLength - (this.pathLength * scrollPercentage) / 100;
    this.highlightPath.nativeElement.style.strokeDashoffset = String(Math.max(0, drawLength));



    this.litEllipseId = this.calculateLitEllipse(scrollPosition);
    this.updateEllipseClasses();
    console.log(scrollPosition);


  }


  private calculateLitEllipse(scrollPosition: number): string | null {
    // Your logic to determine the ID of the ellipse that should light up based on the scroll position
    if (scrollPosition > 6000) {
      return 'journey__ellipse-22';

    }else if (scrollPosition > 5400) {
      return 'journey__ellipse-20';

    }else if (scrollPosition > 4528) {
      return 'journey__ellipse-21';

    }else if (scrollPosition > 3528) {
      return 'journey__ellipse-18';

    }else if (scrollPosition > 3000) {
      return 'journey__ellipse-17';

    }else if (scrollPosition > 2500) {
      return ' ellipse-buddy';
    }else if (scrollPosition > 1200) {
      return 'journey__ellipse-15';
    }else if (scrollPosition > 600) {
      return 'journey__ellipse-14';
    }else if (scrollPosition > -1) {
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



@HostListener('window:wheel', ['$event'])
onWindowScroll(event?: WheelEvent) { // '?' makes the event parameter optional
  if (event && event.cancelable) {
    event.preventDefault(); // Prevents the default scroll action if it's cancelable
  }

  // Additional checks or logic here...
  // ...

  if (event) { // Check if event is defined before accessing its properties
    // Existing logic that depends on the event object
    const delta = event.deltaY;

    if (this.isScrollingToEllipse) {
      return; // Exit if animation is in progress
    }

    const nextEllipseId = this.getNextEllipseId(delta);
    this.scrollToEllipse(nextEllipseId);
  }
}

private getNextEllipseId(delta: number): string | null {
  // Logic to determine the next ellipse based on current scroll position and direction
  // ...
}

private scrollToEllipse(ellipseId: string): void {
  // Logic to smoothly scroll to the ellipse element with the given ID
  // ...
}
function onWindowScroll(arg0: any) {
  throw new Error('Function not implemented.');
}


