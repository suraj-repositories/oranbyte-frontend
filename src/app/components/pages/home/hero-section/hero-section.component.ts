import { Component } from '@angular/core';
import { SocialMediaComponent } from "../../../social-media/social-media.component";

@Component({
  selector: 'app-hero-section',
  imports: [SocialMediaComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
 prefix: string = "Want to be";
suffix: string = "an orange";

ngOnInit(): void {
  const taglines = [
    { prefix: "Want to be", suffix: "an Orange"},
    { prefix: "Feel the", suffix: "Energy"},
    { prefix: "Create your own", suffix: "Sunshine"},
    { prefix: "Ignite the", suffix: "Spark" },
    { prefix: "Think beyond", suffix: "Limits" },
    { prefix: "Turn ideas into", suffix: "Reality"},
    { prefix: "Stay true to", suffix: "your Color"},
    { prefix: "Powered by", suffix: "Passion"},
    { prefix: "Chase the", suffix: "Glow"},
    { prefix: "Designed to", suffix: "Shine" }
  ];

  const randomIndex = this.getRandomInt(0, taglines.length - 1);
  this.prefix = taglines[randomIndex].prefix;
  this.suffix = taglines[randomIndex].suffix;
}

getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


}
