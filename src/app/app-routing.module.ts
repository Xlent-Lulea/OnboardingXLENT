import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './Containers/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './Containers/login/login.component';
import { ChecklistComponent } from './Containers/checklist/checklist.component';
import { LinksComponent } from './Containers/links/links.component';
import { KnowledgeComponent } from './Containers/knowledge/knowledge.component';
import { AdminPageComponent } from './Containers/adminpage/adminpage.component';





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
      { path: 'checklist', component: ChecklistComponent },
      { path: 'links', component: LinksComponent },
      { path: 'knowledge', component: KnowledgeComponent },
      { path: 'admin-page', component: AdminPageComponent }

      // ... andra rutter
    ]


