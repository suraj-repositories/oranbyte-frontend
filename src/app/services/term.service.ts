import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TermService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }

  getTerms(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/term/latest`).pipe(
      tap(response => {
        console.log(response);
      })
    );
  }

}
