import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class ProjectService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }


  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects`).pipe(
      tap(response => {
        console.log(response);
      })
    );
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/project/${id}`).pipe(
      tap(response => {
        console.log(response);
      })
    );
  }

  getProjectByName(name: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/project/${name}`).pipe(
      tap(response => {
        console.log(response);
      })
    );
  }

  getProjectReadmeByProjectName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/project/${name}/readme`).pipe(
      tap(response => {
        console.log(response);
      })
    );
  }

  getAllWithImage(): Observable<any[]> {
    console.log(`${this.apiUrl}/projects?withImage=true`);
    return this.http.get<any[]>(`${this.apiUrl}/projects?withImage=true`).pipe(
      tap(response => {
        console.log(response);
      })
    );
  }

  getPopularProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects/popular`).pipe(
      tap(response => {
        console.log(response);
      })
    );
  }

  getProjectLanguages(projectName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/project/${projectName}/languages`).pipe(
      tap(response => {
        console.log(response);
      })
    );
  }

}
