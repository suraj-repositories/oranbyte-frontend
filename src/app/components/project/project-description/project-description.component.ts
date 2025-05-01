import { Component, OnInit, OnDestroy, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap, Subscription, catchError } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../loading/loading.component';
import { PopularProjectsComponent } from "../popular-projects/popular-projects.component";
import 'iconify-icon';
import { ProjectLanguagesComponent } from '../project-languages/project-languages.component';

@Component({
  selector: 'app-project-description',
  standalone: true,
  imports: [CommonModule, LoadingComponent, PopularProjectsComponent, ProjectLanguagesComponent],
  templateUrl: './project-description.component.html',
  styleUrl: './project-description.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectDescriptionComponent implements OnInit, OnDestroy {

  projectId: number | null = null;
  readmeContent: string | null = null;
  safeReadmeHtml: SafeHtml | null = null;
  projectName: string | null = null;
  projectDescription: string | null = null;
  projectUrl: string | null = null;
  private routeSubscription: Subscription | undefined;
  private sanitizer = inject(DomSanitizer);
  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadProject();
    this.loadReadme();

    // window.scrollTo(0, 0);
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  loadProject(){
    this.routeSubscription = this.route.paramMap.pipe(
      switchMap(params => {
        this.projectName = params.get('name');
        if (this.projectName) {
          return this.projectService.getProjectByName(this.projectName).pipe(
            catchError(error => {
              this.router.navigate(['/error']);
              return of({ data: null });
            })
          );
        }
        return of({ data: null });
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          this.projectId = response.id;
          this.projectName = response.name;
          this.projectDescription = response.description;
          this.projectUrl = response.url;
        } else {
          this.handleProjectLoadError();
        }
      },
      error: (error) => {
        this.handleProjectLoadError();
      }
    });
  }


  loadReadme(){
    this.routeSubscription = this.route.paramMap.pipe(
      switchMap(params => {
        this.projectName = params.get('name');
        if (this.projectName) {
          return this.projectService.getProjectReadmeByProjectName(this.projectName).pipe(
            catchError(error => {
              this.router.navigate(['/error']);
              return of({ data: null });
            })
          );
        }
        return of({ data: null });
      })
    ).subscribe({
      next: (response: string) => {
        if (response) {
          this.readmeContent = response;
          this.sanitizeMarkdown(this.readmeContent).then((safeHtml) => {
            this.safeReadmeHtml = (safeHtml as any).changingThisBreaksApplicationSecurity;
          });
        } else {
          this.handleReadmeLoadError();
        }
      },
      error: (error) => {
        this.handleReadmeLoadError();
      }
    });
  }

  async sanitizeMarkdown(markdown: string | null): Promise<SafeHtml | null> {
    if (!markdown) {
      return null;
    }
    const htmlContent = await marked.parse(markdown);
    const sanitize = this.sanitizer.bypassSecurityTrustHtml(htmlContent)
    return sanitize;
  }

  private handleReadmeLoadError(): void {
    this.readmeContent = 'Error loading README.';
    this.safeReadmeHtml = this.sanitizer.bypassSecurityTrustHtml(this.readmeContent);
  }

  private handleProjectLoadError(): void{

  }
}
