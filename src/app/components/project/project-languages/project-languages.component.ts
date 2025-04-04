import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap, Subscription, catchError } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-languages',
  imports: [CommonModule],
  templateUrl: './project-languages.component.html',
  styleUrls: ['./project-languages.component.css']
})
export class ProjectLanguagesComponent {

  projectId: number | null = null;
  languages: any | null = null;

  private routeSubscription: Subscription | undefined;
  private route = inject(ActivatedRoute);

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjectLanguages();
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  getProjectLanguages() {
    this.routeSubscription = this.route.paramMap.pipe(
      switchMap(params => {
        this.projectId = Number(params.get('id'));
        if (this.projectId) {
          return this.projectService.getProjectLanguages(this.projectId).pipe(
            catchError(error => {
              console.error('Error fetching project languages:', error);
              return of(null);
            })
          );
        }
        return of(null);
      })
    ).subscribe({
      next: (response) => {
        console.log('Project languages response:', response);
        if (response) {
          this.languages = response;
        } else {
          this.handleLanguageLoadError();
        }
      },
      error: () => {
        this.handleLanguageLoadError();
      }
    });
  }

  handleLanguageLoadError() {
    console.error('Error loading project languages');
    this.languages = null;
  }

  get languageArray(): { key: string, value: number }[] {
    return this.languages
      ? Object.entries(this.languages).map(([key, value]) => ({ key, value: value as number }))
      : [];
  }
  }
