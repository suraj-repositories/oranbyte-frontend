import { ChangeDetectorRef, Component } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { environment } from 'src/environments/environment';


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
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
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
    this.projectService.getAllWithImage().subscribe({
      next: (response) => {
        console.log('shubh', response);
        if (isApiResponse(response)) {
          this.projects = response.data;
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
