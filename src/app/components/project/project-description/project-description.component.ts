import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap, Subscription } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked'; // Import marked.js for Markdown parsing

@Component({
  selector: 'app-project-description',
  standalone: true, // Mark as standalone since you have 'imports: []'
  imports: [], // You'll likely want to import CommonModule if you use *ngIf, etc.
  templateUrl: './project-description.component.html',
  styleUrl: './project-description.component.css'
})
export class ProjectDescriptionComponent implements OnInit, OnDestroy {

  projectId: number | null = null;
  readmeContent: string | null = null;
  safeReadmeHtml: SafeHtml | null = null;
  private routeSubscription: Subscription | undefined;
  private sanitizer = inject(DomSanitizer); // Inject DomSanitizer
  private projectService = inject(ProjectService); // Inject ProjectService
  private route = inject(ActivatedRoute); // Inject ActivatedRoute

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.pipe(
      switchMap(params => {
        this.projectId = Number(params.get('id'));
        if (this.projectId) {
          return this.projectService.getProjectReadmeById(this.projectId);
        }
        return of(null); // Return null when projectId is not available
      })
    ).subscribe(
      (response: any) => { // Adjust 'any' to your expected response type
        if (response && response.data) {
          this.readmeContent = response.data;
          this.safeReadmeHtml = this.sanitizeMarkdown(this.readmeContent);
        } else {
          this.readmeContent = 'Error loading README.';
          this.safeReadmeHtml = this.sanitizer.bypassSecurityTrustHtml(this.readmeContent);
        }
      },
      (error) => {
        console.error('Error fetching README:', error);
        this.readmeContent = 'Error loading README.';
        this.safeReadmeHtml = this.sanitizer.bypassSecurityTrustHtml(this.readmeContent);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  async sanitizeMarkdown(markdown: string | null): Promise<SafeHtml | null> {
    if (!markdown) {
      return null;
    }
    // Use marked.js for more robust Markdown parsing
    const htmlContent = await marked.parse(markdown);
    return this.sanitizer.bypassSecurityTrustHtml(htmlContent);
  }
}
