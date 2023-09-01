import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './Components/home/home.component';
import { HomeContentComponent } from './Containers/home-content/home-content.component';



@NgModule({
  declarations: [
    HomeComponent,
    HomeContentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HemModule { }
