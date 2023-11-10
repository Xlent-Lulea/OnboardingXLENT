import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit, AfterViewInit {
  @ViewChild('highlightPath', { static: false }) highlightPath!: ElementRef<SVGPathElement>;

  private pathLength = 0; // Will be set to the SVG path's length after view init

  private ellipsesData: { id: string; lengthAlongPath: number }[] = [
    { id: 'ellipse-hej', lengthAlongPath: 1000 }, // example length along the path
    { id: 'ellipse-buddy', lengthAlongPath: 2300 }, // and so on...
    // ... other ellipses
  ];

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
    const scrollPercentage = (scrollPosition / (docHeight - windowHeight)) * 100;
    const drawLength = this.pathLength - (this.pathLength * scrollPercentage) / 100;
    this.highlightPath.nativeElement.style.strokeDashoffset = String(Math.max(0, drawLength));
    const currentOffset = this.calculateCurrentOffset();
    const scrolllog = window.scrollY || document.documentElement.scrollTop;
    console.log(scrolllog);


    // Loop over each ellipse to check if it should be active
    this.ellipsesData.forEach((ellipseData) => {
      const ellipse = document.getElementById(ellipseData.id);
      if (currentOffset <= this.pathLength - ellipseData.lengthAlongPath) {
        ellipse?.classList.add('active');
      } else {
        ellipse?.classList.remove('active');
      }
    });
  }

  private calculateCurrentOffset(): number {
    // Implement logic to convert scrollY to stroke offset
    // This is a placeholder function and needs to be adjusted to your page's specific behavior
    const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight));
    return scrollPercentage * this.pathLength;
  }

}

