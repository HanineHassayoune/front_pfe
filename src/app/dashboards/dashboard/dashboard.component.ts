import { Component, OnInit } from '@angular/core';
import { PieChartComponent } from '../../components/pie-chart/pie-chart.component';
import { RadialChartComponent } from '../../components/radial-chart/radial-chart.component';
import { CommonModule } from '@angular/common';
import { ColumnChartComponent } from '../../components/column-chart/column-chart.component';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';
import { StatisticsService } from '../../services/statistics.service';

interface Project {
  id: number;
  title: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PieChartComponent, RadialChartComponent, CommonModule, ColumnChartComponent, LineChartComponent,RadialChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  projects: Project[] = [];
  selectedProject!: Project;
  ticketCountPerDay: Record<string, number> = {}
  stats: Record<string, any> = {};

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.statisticsService.getAllProjects('').subscribe({
      next: (projects) => {
        this.projects = projects;
        if (this.projects.length > 0) {
          this.selectedProject = this.projects[0];
          this.loadStatistics(this.selectedProject.id);
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des projets', err);
      }
    });
  }

  loadStatistics(projectId: number): void {
    const key = this.selectedProject.title;

    this.stats[key] = this.stats[key] || {};

    this.statisticsService.getUserCountByProject(projectId).subscribe({
      next: (count) => {
        this.stats[key] = {
          ...this.stats[key],
          members: count
        };
      },
      error: (err) => console.error('Erreur membres', err)
    });

    this.statisticsService.getTicketCategoriesPercentageByProject(projectId).subscribe({
      next: (categories) => {
        this.stats[key] = {
          ...this.stats[key],
          logs: categories
        };
      },
      error: (err) => console.error('Erreur logs', err)
    });

    this.statisticsService.getTicketStatusesByProject(projectId).subscribe({
      next: (ticketsMap) => {
      const tickets = {
        TO_DO: ticketsMap['TO_DO'] || 0,
        IN_PROGRESS: ticketsMap['IN_PROGRESS'] || 0,
        RESOLVED: ticketsMap['RESOLVED'] || 0,
        MERGING: ticketsMap['MERGING'] || 0,
        VERIFIED: ticketsMap['VERIFIED'] || 0,
        DONE: ticketsMap['DONE'] || 0
      };
     this.stats[key] = {
          ...this.stats[key],
          tickets,
          duration: 'Durée inconnue'
        };
      },
      error: (err) => console.error('Erreur tickets', err)
    });

    this.statisticsService.getTicketPrioritiesByProject(projectId).subscribe({
    next: (prioritiesMap) => {
      const priorities = Object.entries(prioritiesMap);
      const labels = priorities.map(([label]) => label);
      const series = priorities.map(([, count]) => count);
      const colors = labels.map((label) => this.getPriorityColor(label));

    this.stats[key] = {
      ...this.stats[key],
      priorities: {
        labels,
        series,
        colors
      }
    };
  },
  error: (err) => console.error('Erreur priorités', err)
});

this.statisticsService.getTicketCountByCategoryAndPriority(projectId).subscribe({
  next: (categoryPriorityMap) => {
    this.stats[key] = {
      ...this.stats[key],
      categoryPriority: categoryPriorityMap
    };
  },
  error: (err) => console.error('Erreur category + priority', err)
});

this.statisticsService.getTicketCountPerDay(projectId).subscribe({
      next: (data) => {
        this.ticketCountPerDay = data;
      },
      error: (err) => console.error('Erreur tickets par jour', err)
    });


  }

  
getPriorityColor(priority: string): string {
  switch (priority) {
    case 'LOW': return '#1C64F2';
    case 'MEDIUM': return '#16BDCA';
    case 'HIGH': return '#FDBA8C';
    case 'CRITICAL': return '#DC2626';
    default: return '#9CA3AF'; 
  }
}

  selectProject(project: Project): void {
    this.selectedProject = project;
    this.loadStatistics(project.id);
  }
}
