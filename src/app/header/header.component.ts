import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  selectedPersonName$: Observable<string | null> = this.personService.selectedPerson$.pipe(
    map((person) => person?.name || 'Login' )
  );

  constructor(
    private personService: PersonService,
  ) { }
}
