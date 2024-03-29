import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { KnowledgeComponent } from './Containers/knowledge/knowledge.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ExpansionPanelComponent } from './Components/expansion-panel/expansion-panel.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AdminPageComponent } from './Containers/admin-page/admin-page.component';
import { ManagePersonsComponent } from './Components/manage-persons/manage-persons.component';
import { ManageTasksComponent } from './Components/manage-tasks/manage-tasks.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './Components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { TaskService } from './services/task.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { PersonService } from './services/person.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { PortraitsComponent } from './Components/portraits/portraits.component';
import { ManageTasktypesComponent } from './Components/manage-tasktypes/manage-tasktypes.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { TaskTypeService } from './services/tasktype.service';
import { SnackBarService } from './services/snack-bar-service';
import { SnackBarComponent } from './Components/snack-bar/snack-bar.component';
import { FormErrorMessageComponent } from './Components/form-error-message/form-error-message.component';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ChecklistComponent,
    TitleComponent,
    AboutComponent,
    WalkthroughComponent,
    LinksComponent,
    LoginBoxComponent,
    KnowledgeComponent,
    LinksComponent,
    ExpansionPanelComponent,
    AdminPageComponent,
    ManagePersonsComponent,
    ManageTasksComponent,
    ConfirmDialogComponent,
    LoginBoxComponent,
    KnowledgeComponent,
    PortraitsComponent,
    ManageTasktypesComponent,
    SnackBarComponent,
    FormErrorMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatListModule,
    MatDividerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatProgressBarModule,
    MatGridListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatRadioModule
  ],
  providers: [
    TaskService,
    PersonService,
    TaskTypeService,
    SnackBarService,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { panelClass: ['snackbar-confirm'] },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
