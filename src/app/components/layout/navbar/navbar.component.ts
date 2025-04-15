import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
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

  dropdownOpen: boolean = false;

  projects: any[] = [];
  constructor(
    private projectService: ProjectService,
    private cdRef: ChangeDetectorRef,
    public router: Router
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

  toggleNav(){
    document.body.classList.toggle('mobile-nav-active');
  }


  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }



}
