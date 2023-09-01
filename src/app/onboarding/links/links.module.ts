import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkViewComponent } from './Containers/link-view/link-view.component';
import { LinkContentComponent } from './Components/link-content/link-content.component';



@NgModule({
  declarations: [
    LinkViewComponent,
    LinkContentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LinksModule { }
