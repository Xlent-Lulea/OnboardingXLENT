import { Component } from '@angular/core';
import { PersonService } from './services/person.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OnboardingXLENT';

  constructor(private personService:PersonService) {

  const storedPersonId = localStorage.getItem('personId') || '';
  this.personService.getPerson(storedPersonId).pipe(
    tap((p) => console.log(p))
  ).subscribe();
}
}
