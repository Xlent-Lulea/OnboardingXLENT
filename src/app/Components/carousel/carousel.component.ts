import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {

  selectedPersonName$: Observable<String | null> = this.personService.selectedPerson$.pipe(
    map((person) => person?.name === 'test1' ? null : person),
    map((person) => person?.name || 'Login' )
  );


  constructor(
    private personService: PersonService,
  ) { }

  isActive = 1;


  next() {
    if (this.isActive == 8) this.isActive = 0;
    this.isActive ++;
  }
  pre() {
    this.isActive --;
    if (this.isActive == 0) this.isActive = 8;
  }

}


