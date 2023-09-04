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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { ExpansionPanelComponent } from './Components/expansion-panel/expansion-panel.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AdminPageComponent } from './Containers/admin-page/admin-page.component';
import { ManagePersonsComponent } from './Components/manage-persons/manage-persons.component';
import { ManageTasksComponent } from './Components/manage-tasks/manage-tasks.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './Components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';




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
    ExpansionPanelComponent,
    AdminPageComponent,
    ManagePersonsComponent,
    ManageTasksComponent,
    ConfirmDialogComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
