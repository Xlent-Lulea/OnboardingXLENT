import { Component } from '@angular/core';
import { PersonService } from './services/person.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OnboardingXLENT';

  constructor(
    private personService: PersonService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('sv');
    const storedPersonId = localStorage.getItem('personId') || '';
    this.personService.getPerson(+storedPersonId).subscribe();
  }
}
