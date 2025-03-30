import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ErrorComponent } from './components/errors/error/error.component';
import { ProjectDescriptionComponent } from './components/project/project-description/project-description.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { TermsComponent } from './components/pages/terms/terms.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'project/:id', component: ProjectDescriptionComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'terms', component: TermsComponent },
  { path: '**', component: ErrorComponent },

];
