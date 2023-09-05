import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1>Hej {{name}}!</h1>`,
  
})
export class HelloComponent  {
  @Input()
    name!: string;
}
