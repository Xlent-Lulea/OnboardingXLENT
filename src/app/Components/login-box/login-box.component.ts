import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from 'src/app/models/task.interface';
@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss']
})
export class LoginBoxComponent {
  @Input() activePersons: Person[] | null = [];
  @Input() selectedPerson: Person | null = null;

  @Output() onPersonSelected = new EventEmitter<number>();
  }






