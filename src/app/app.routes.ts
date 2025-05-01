import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ErrorComponent } from './components/errors/error/error.component';
import { ProjectDescriptionComponent } from './components/project/project-description/project-description.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { TermsComponent } from './components/pages/terms/terms.component';
import { ProjectComponent } from './components/project/project.component';

export const routes: Routes = [
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'projects/:name', component: ProjectDescriptionComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: ErrorComponent },

];
