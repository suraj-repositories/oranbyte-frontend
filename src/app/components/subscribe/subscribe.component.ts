import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubscribeService } from 'src/app/services/subscribe.service';

interface SubscribeResponse {
  errors?: { [key: string]: string[] };
  message?: string;
}


@Component({
  selector: 'app-subscribe',
  standalone: true, // Make sure to include this if it's a standalone component
  imports: [FormsModule, CommonModule],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css'
})


export class SubscribeComponent {
  email = "";
  submitSuccess = false;
  loading: boolean = false;
  validationErrors: { [key: string]: string[] } = {};

  @ViewChild('subscribeFrom') subscribeFrom: any;

  constructor(private subscribService: SubscribeService){}

  subscribeSubmit(){
    this.submitSuccess = false;
    this.loading = true;
    this.validationErrors = {};

    this.subscribService.subscribeSave(this.email).subscribe({
      next: (response: SubscribeResponse) => {

        if(response.errors){
          this.validationErrors = response.errors;
          this.autoClearMessages();
          return;
        }

        this.submitSuccess = true;
        this.resetForm();
        this.loading = false;
        this.autoClearMessages();
      },
      error: (error) => {
        if (error?.error?.errors) {
          this.validationErrors = error.error.errors;
        } else {
          this.validationErrors = { 'general': [error.message || 'An unexpected error occurred.'] };
        }
        this.loading = false;
        this.autoClearMessages();
      }
    });
  }

  resetForm(){
    this.email = "";
    if (this.subscribeFrom) {
      this.subscribeFrom.resetForm();
    }
  }

  autoClearMessages() {
    setTimeout(() => {
      this.submitSuccess = false;
      this.validationErrors = {};
    }, 4000);
  }
}
