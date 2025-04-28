import { Component } from '@angular/core';
import { SocialMediaComponent } from "../../../social-media/social-media.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  imports: [SocialMediaComponent, RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {

}
