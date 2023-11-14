import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error-message',
  templateUrl: './form-error-message.component.html',
  styleUrls: ['./form-error-message.component.scss']
})
export class FormErrorMessageComponent {
  errorMessages = {
    maxLength: 'Inmatningen överskrider det maximala antalet tillåtna tecken',
    required: 'Fältet är obligatoriskt',
    email: 'Vänligen ange en giltig e-postadress'
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input({ required: true }) control: AbstractControl<any, any> | null = null;
}
