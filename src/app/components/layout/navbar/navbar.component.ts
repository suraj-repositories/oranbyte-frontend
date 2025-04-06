import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class NavbarComponent {
  appName = environment.appName;
  projects: any[] = [];
  constructor(
    private projectService: ProjectService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loadProjects();
    console.log(this.projects);
  }

  loadProjects(){
    this.projectService.getAll().subscribe({
      next: (response) => {
        if (response) {
          this.projects = response;
          this.cdRef.detectChanges();
        }
      },
      error: (error) => {
        console.error('Received unexpected response format:', error);
        this.projects = [];
        this.cdRef.detectChanges();
      },
    });
  }

}
