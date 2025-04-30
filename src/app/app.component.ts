import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from "./components/layout/layout/layout.component";
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'oranbyte-frontend';

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
