import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }

  sendContactForm(formData: any) {
    return this.http.post(`${this.apiUrl}/contact`, formData, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  getAllContacts() {
    return this.http.get(`${this.apiUrl}/contact`, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

}
