import {Component, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';


/**
 * @title Accordion with expand/collapse all toggles
 */
@Component({
  selector: 'expansionpanel',
  templateUrl: 'expansionpanel.component.html',
  styleUrls: ['expansionpanel.component.scss'],
  standalone: false,

})
export class ExpansionpanelComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
}
