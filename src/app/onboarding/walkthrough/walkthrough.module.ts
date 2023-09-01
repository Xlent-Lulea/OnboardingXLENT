import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalkthroughViewComponent } from './Components/walkthrough-view/walkthrough-view.component';
import { WalkthroughContentComponent } from './Containers/walkthrough-content/walkthrough-content.component';



@NgModule({
  declarations: [
    WalkthroughViewComponent,
    WalkthroughContentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WalkthroughModule { }
