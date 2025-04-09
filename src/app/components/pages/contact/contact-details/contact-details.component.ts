import { Component} from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-details',
  imports: [],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css'
})
export class ContactDetailsComponent {

  configs:any = {
    'app_name': '',
    'address': '',
    'phone': '',
    'city': '',
    'state': '',
    'pin': '',
    'country': '',
    'email': '',
  };
  map_embedded_url: SafeResourceUrl | null = null;
  configsArray:any = null;

  constructor(private appConfigService: AppConfigService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loadConfigs();
  }

  loadConfigs() {
    this.appConfigService.getAppConfig().subscribe((response) => {
      this.configsArray = response;
      this.configs = {};
      response.forEach((item: any) => {
        this.configs[item.key] = item.value;
        if(item.key == 'map_src') {
          this.configs['map_src'] = this.sanitizer.bypassSecurityTrustResourceUrl(item.value);
          this.map_embedded_url = this.sanitizer.bypassSecurityTrustResourceUrl(item.value);
        }
      });

      console.log(this.configs['app_name']);
    });
  }


}
