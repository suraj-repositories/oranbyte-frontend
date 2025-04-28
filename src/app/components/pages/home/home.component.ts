import { Component } from '@angular/core';
import 'iconify-icon';
import { ContactComponent } from "../contact/contact.component";
import { ProjectComponent } from "../../project/project.component";
import { RouterLink } from '@angular/router';
import { SocialMediaComponent } from '../../social-media/social-media.component';
import { AboutContentComponent } from "../about/about-content/about-content.component";
import { StatsComponent } from "../about/stats/stats.component";
import { FeatureServicesComponent } from "./feature-services/feature-services.component";
import { GetInTouchComponent } from "./get-in-touch/get-in-touch.component";
import { HeroSectionComponent } from "./hero-section/hero-section.component";

@Component({
  selector: 'app-home',
  imports: [ContactComponent, ProjectComponent, RouterLink, SocialMediaComponent, AboutContentComponent, StatsComponent, FeatureServicesComponent, GetInTouchComponent, HeroSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
