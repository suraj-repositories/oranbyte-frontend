import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/skills`).pipe(
        tap(response => {
          console.log(response);
        })
      );
    }
}
