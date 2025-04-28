import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TermService } from 'src/app/services/term.service';

interface Term {
  id: number;
  content: string;
  type: string;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-terms',
  imports: [CommonModule],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.css'
})
export class TermsComponent {
  term: Term = {
    id: 0,
    content: '',
    type: '',
    created_at: '',
    updated_at: ''
  };

  private sanitizer = inject(DomSanitizer);

  constructor(protected termService: TermService) { }

  ngOnInit(): void {
    this.loadTerm();
  }
  loadTerm() {
    this.termService.getTerms().subscribe((response) => {

      response.content = this.sanitizer.bypassSecurityTrustHtml(response.content);

      this.term = response;
    });
  }

}
