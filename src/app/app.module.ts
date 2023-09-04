import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { routes } from './app-routing.module';
import { HomeComponent } from './Containers/home/home.component';
import { LoginComponent } from './Containers/login/login.component';
import { ChecklistComponent } from './Containers/checklist/checklist.component';
import { TitleComponent } from './Components/title/title.component';
import { AboutComponent } from './Components/about/about.component';
import { WalkthroughComponent } from './Components/walkthrough/walkthrough.component';
import { MatButtonModule } from '@angular/material/button';
import { LinksComponent } from './Containers/links/links.component';
import { LoginBoxComponent } from './Components/login-box/login-box.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    HomeComponent,
    LoginComponent,
    ChecklistComponent,
    TitleComponent,
    AboutComponent,
    WalkthroughComponent,
    LinksComponent,
    LoginBoxComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
