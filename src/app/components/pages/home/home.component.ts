import { Component } from '@angular/core';
import 'iconify-icon';
import { AboutComponent } from "../about/about.component";
import { ContactComponent } from "../contact/contact.component";
import { ProjectComponent } from "../../project/project.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [AboutComponent, ContactComponent, ProjectComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
