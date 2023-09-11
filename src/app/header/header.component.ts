import { Component, OnInit } from '@angular/core';
import { PersonService, SelectedPersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedPersonName: string = '';

  constructor(
    private personService: PersonService,
    private selectedPersonService: SelectedPersonService
  ) {}

  ngOnInit(): void {
    this.selectedPersonService.getPersonId().subscribe(personId => {
      if (personId) {
        this.personService.getPerson(+personId).subscribe(person => {
          this.selectedPersonName = person.name;
        });
      }
    });
  }
}
