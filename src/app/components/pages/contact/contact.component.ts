import { Component } from '@angular/core';
import { ContactDetailsComponent } from "./contact-details/contact-details.component";
import { ContactFormComponent } from "./contact-form/contact-form.component";

@Component({
  selector: 'app-contact',
  imports: [ContactDetailsComponent, ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
