import { Component } from '@angular/core';
import { PersonService } from './services/person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OnboardingXLENT';

  constructor(private personService: PersonService) {
    const storedPersonId = localStorage.getItem('personId') || '';
    this.personService.getPerson(+storedPersonId).subscribe();
  }
}
