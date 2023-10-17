import { Component } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent {
  employeePoints = [
    { title: 'Point 1', description: 'Description for point 1' },
    { title: 'Point 2', description: 'Description for point 2' },
    // ... Add all 9 points similarly
  ];

  selectedPoint: any = null;

  showInfo(point: any) {
    this.selectedPoint = point;
  }
}
