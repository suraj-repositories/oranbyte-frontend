import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap, Subscription, catchError } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../loading/loading.component';

interface ProjectReadmeResponse {
  data?: string;
}

@Component({
  selector: 'app-project-description',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './project-description.component.html',
  styleUrl: './project-description.component.css'
})
export class ProjectDescriptionComponent implements OnInit, OnDestroy {

  projectId: number | null = null;
  readmeContent: string | null = null;
  safeReadmeHtml: SafeHtml | null = null;
  private routeSubscription: Subscription | undefined;
  private sanitizer = inject(DomSanitizer);
  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loadReadme();

  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
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
      next: (response: ProjectReadmeResponse) => {
        if (response && response.data) {
          this.readmeContent = response.data;
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
    console.log();
    return sanitize;
  }

  private handleReadmeLoadError(): void {
    this.readmeContent = 'Error loading README.';
    this.safeReadmeHtml = this.sanitizer.bypassSecurityTrustHtml(this.readmeContent);
  }
}
