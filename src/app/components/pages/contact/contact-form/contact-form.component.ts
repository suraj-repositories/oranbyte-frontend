import { CommonModule } from '@angular/common';
import { Component, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {

  name: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';
  validationErrors: { [key: string]: string[] } = {};
  submitSuccess: boolean = false;

  loading: boolean = false;

  @ViewChild('contactForm') contactForm: any;

  constructor(private contactService: ContactService) { }

  submitContactForm() {
    this.submitSuccess = false;
    this.loading = true;

    const formData = {
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message
    };

    this.contactService.sendContactForm(formData).subscribe({
      next: (response) => {
        this.submitSuccess = true;
        this.resetForm();
      },
      error: (error) => {
        if (error?.error?.errors) {
          this.validationErrors = error.error.errors;
        } else {
          this.validationErrors = { 'general': [error.message || 'An unexpected error occurred.'] };
        }
        this.loading = false;
      }
    });

  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.subject = '';
    this.message = '';
    this.contactForm.resetForm();
    this.validationErrors = {};
    this.loading = false;
  }


}
