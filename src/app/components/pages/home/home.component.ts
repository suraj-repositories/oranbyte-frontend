import { Component } from '@angular/core';
import { NavbarComponent } from "../../layout/navbar/navbar.component";
import { FooterComponent } from '../../layout/footer/footer.component';
import 'iconify-icon';
import { AboutComponent } from "../about/about.component";
import { ContactComponent } from "../contact/contact.component";
import { ProjectComponent } from "../../project/project.component";

@Component({
  selector: 'app-home',
  imports: [AboutComponent, ContactComponent, ProjectComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
