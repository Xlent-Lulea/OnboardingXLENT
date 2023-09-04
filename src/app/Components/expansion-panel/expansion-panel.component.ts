import {Component, ViewChild} from '@angular/core';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';



/**
 * @title Accordion with expand/collapse all toggles
 */
@Component({
  selector: 'app-expansion-panel',
  templateUrl: 'expansion-panel.component.html',
  styleUrls: ['expansion-panel.component.scss'],
})



export class ExpansionPanelComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
}
