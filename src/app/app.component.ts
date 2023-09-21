import { Component } from '@angular/core';
import { PersonService } from './services/person.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OnboardingXLENT';
  selectedPersonName$: Observable<String | null> = this.personService.selectedPerson$.pipe(
    map((person) => person?.name === 'test1' ? null : person),
    map((person) => person?.name || 'Login' )
  );

  

  constructor(
    private personService: PersonService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('sv');
    const storedPersonId = localStorage.getItem('personId') || '';
    this.personService.getPerson(+storedPersonId).subscribe();
  }
}
