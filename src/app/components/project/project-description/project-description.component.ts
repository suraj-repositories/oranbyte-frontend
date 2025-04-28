import { Component, OnInit, OnDestroy, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
        this.projectId = Number(params.get('id'));
        if (this.projectId) {
          return this.projectService.getProjectById(this.projectId).pipe(
            catchError(error => {
              return of({ data: null });
            })
          );
        }
        return of({ data: null });
      })
    ).subscribe({
      next: (response) => {
        if (response) {
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
        this.projectId = Number(params.get('id'));
        if (this.projectId) {
          return this.projectService.getProjectReadmeById(this.projectId).pipe(
            catchError(error => {
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
