import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {

  selectedPersonName$: Observable<string | null> = this.personService.selectedPerson$.pipe(
    map((person) => person?.name || 'N/A' )
  );


  constructor(
    private personService: PersonService,
  ) { }

  isActive = 1;


  next() {
    if (this.isActive == 9) this.isActive = 0;
    this.isActive ++;
  }
  pre() {
    this.isActive --;
    if (this.isActive == 0) this.isActive = 9;
  }

}


