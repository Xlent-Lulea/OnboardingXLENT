import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecklistViewComponent } from './Components/checklist-view/checklist-view.component';
import { ChecklistContentComponent } from './Containers/checklist-content/checklist-content.component';



@NgModule({
  declarations: [
    ChecklistViewComponent,
    ChecklistContentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ChecklistModule { }
