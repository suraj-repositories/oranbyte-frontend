import { Component } from '@angular/core';
import { ProfessionalExperienceComponent } from "./professional-experience/professional-experience.component";

@Component({
  selector: 'app-about',
  imports: [ProfessionalExperienceComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
