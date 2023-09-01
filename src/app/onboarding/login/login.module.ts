import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginContentComponent } from './Containers/login-content/login-content.component';
import { LoginViewComponent } from './Components/login-view/login-view.component';



@NgModule({
  declarations: [
    LoginContentComponent,
    LoginViewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LoginModule { }
