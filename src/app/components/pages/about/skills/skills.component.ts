import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SkillService } from 'src/app/services/skill.service';

interface Skill {
  id: number;
  name: string;
  percentage: string;
}

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SkillsComponent {
  skills: Skill[] = [];

  constructor(public skillService: SkillService) {

  }

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills() {
    this.skillService.getAll().subscribe((response) => {
      this.skills = response;
    });
  }

}
