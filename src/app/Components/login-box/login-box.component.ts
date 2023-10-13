import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from 'src/app/models/person.interface';
@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss']
})
export class LoginBoxComponent {
  @Input({ required: true }) activePersons: Person[] | null = [];
  @Input({ required: true }) selectedPerson: Person | null = null;

  @Output() selectPerson = new EventEmitter<number>();
}
