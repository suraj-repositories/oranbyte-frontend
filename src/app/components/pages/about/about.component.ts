import { Component } from '@angular/core';
import { ProfessionalExperienceComponent } from "./professional-experience/professional-experience.component";
import { EducationSummeryComponent } from "./education-summery/education-summery.component";
import { SkillsComponent } from "./skills/skills.component";
import { AboutContentComponent } from "./about-content/about-content.component";

@Component({
  selector: 'app-about',
  imports: [ProfessionalExperienceComponent, EducationSummeryComponent, SkillsComponent, AboutContentComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
