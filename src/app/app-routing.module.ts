import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './Containers/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './Containers/login/login.component';





@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }

export const routes: Routes = [

      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
     
      // ... andra rutter
    ]


