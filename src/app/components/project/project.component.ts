import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { environment } from 'src/environments/environment';
import { LoadingComponent } from "../loading/loading.component";
import { Router } from '@angular/router';

interface ApiResponse {
  status: string;
  data: any[];
}
function isApiResponse(obj: any): obj is ApiResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.status === 'string' &&
    Array.isArray(obj.data)
  );
}

@Component({
  selector: 'app-project',
  imports: [RouterLink, LoadingComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  appName = environment.appName;
  projects: any[] = [];
  constructor(
    private projectService: ProjectService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadProjects();

  }

  loadProjects(){
    this.projectService.getAllWithImage().subscribe({
      next: (response) => {
        console.log('shubh', response);
        if (isApiResponse(response)) {

          if(this.router.url == '/projects'){
            this.projects = response.data;
          }else{
            this.projects = response.data.slice(0, 9);
          }

          this.cdRef.detectChanges();
        } else {
          console.error('Received unexpected response format:', response);
          this.projects = [];
          this.cdRef.detectChanges();
        }

      },
      error: (error) => console.error(error),
    });
  }
}
