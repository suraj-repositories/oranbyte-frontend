import { Component } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';

interface Stats {
  projects: number;
  technologies: number;
  hours_of_support: number;
  subscribers: number;
}

interface StatsResponse {
  data: Stats;
  message: string;
  status: string;
}

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {

  constructor(protected statsService: StatsService) { }

  stats: Stats = {
    projects: 0,
    technologies: 0,
    hours_of_support: 0,
    subscribers: 0
  };

  statResponse: StatsResponse = {
    data: this.stats,
    message: 'Success',
    status: 'success'
  };

  loading: boolean = true;

  ngOnInit() {
    this.statsService.getStats().subscribe((response) => {
      this.statResponse = response;
      this.stats = response.data;
      this.loading = false;
    });
  }

}
