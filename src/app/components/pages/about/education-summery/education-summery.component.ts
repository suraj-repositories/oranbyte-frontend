import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EducationService } from 'src/app/services/education.service';

interface Education {
  id: number;
  degree: string;
  institution: string;
  field_of_study: string;
  start_date: string;
  end_date: string | null;
  currently_studying: string;
  grade: string;
  description: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-education-summery',
  imports: [CommonModule],
  templateUrl: './education-summery.component.html',
  styleUrl: './education-summery.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EducationSummeryComponent {
  educations: Education[] = [];

  constructor(protected educationService: EducationService){}

  ngOnInit(): void {
    this.loadEducations();
  }

  loadEducations(){
    this.educationService.getAll().subscribe((response) =>{
      this.educations = response;
    });
  }

}

