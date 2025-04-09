import { Component } from '@angular/core';
import 'iconify-icon';
import { AboutComponent } from "../about/about.component";
import { ContactComponent } from "../contact/contact.component";
import { ProjectComponent } from "../../project/project.component";
import { RouterLink } from '@angular/router';
import { SocialMediaComponent } from '../../social-media/social-media.component';

@Component({
  selector: 'app-home',
  imports: [AboutComponent, ContactComponent, ProjectComponent, RouterLink, SocialMediaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
