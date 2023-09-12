import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PersonService } from 'src/app/services/person.service';
import { Person } from '../models/task.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // selectedPersonName: string = '';
  selectedPersonName$: Observable<String | null> = this.personService.selectedPerson$.pipe(
    map((person) => person?.name === 'test1' ? null : person),
    map((person) => person?.name || 'Login' )
  );

  constructor(
    private personService: PersonService,
  ) { }

  ngOnInit(): void {
    // this.personService.getPersonId().subscribe(personId => {
    //   if (personId) {
    //     this.personService.getPerson(+personId).subscribe(person => {
    //       this.selectedPersonName = person.name;
    //     });
    //   }
    // });
  }
}
