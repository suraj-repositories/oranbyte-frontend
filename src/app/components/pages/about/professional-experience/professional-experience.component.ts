import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProfessionalExperienceService } from 'src/app/services/professional-experience.service';

interface Experience {
  id: number;
  user_id: number;
  job_title: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string | null;
  currently_working: number;
  description: string;
  technologies: string[];
}


@Component({
  selector: 'app-professional-experience',
  imports: [CommonModule],
  templateUrl: './professional-experience.component.html',
  styleUrl: './professional-experience.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfessionalExperienceComponent {
  experiences: Experience[] = [];


  constructor(public experience: ProfessionalExperienceService){

  }

  ngOnInit(): void {
    this.loadProfressionalExperience();
  }

  loadProfressionalExperience(){
    this.experience.getAll().subscribe((response) => {
      this.experiences = response;
    });
  }

}
