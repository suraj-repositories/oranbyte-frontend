import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SocialMediaService } from 'src/app/services/social-media.service';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-social-media',
  imports: [LoadingComponent],
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SocialMediaComponent {

  socialMediaLinks: any[] = [];

  constructor(private socialMediaService: SocialMediaService) { }

  ngOnInit() {
    this.loadSocialMediaLinks();
  }

  loadSocialMediaLinks() {
    this.socialMediaService.getAll().subscribe({
      next: (response) => {
        if (response) {
          this.socialMediaLinks = response;
        } else {
          console.error('Received unexpected response format:', response);
          this.socialMediaLinks = [];
        }
      },
      error: (error) => {
        console.error(error);
        this.socialMediaLinks = [];
      }

    });
  }


}
