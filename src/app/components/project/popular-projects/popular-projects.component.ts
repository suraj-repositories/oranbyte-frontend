import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { LoadingComponent } from '../../loading/loading.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular-projects',
  standalone: true,
  imports: [LoadingComponent, RouterLink],
  templateUrl: './popular-projects.component.html',
  styleUrl: './popular-projects.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PopularProjectsComponent {

  projects: any[] = [];
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getPopularProjects();
  }

  getPopularProjects() {
    this.projectService.getPopularProjects().subscribe((response) => {
      if (response) {
        this.projects = response;
      } else {
        console.error('Received unexpected response format:', response);
        this.projects = [];
      }
    }, (error) => {
      console.error(error);
      this.projects = [];
    });
  }

}
