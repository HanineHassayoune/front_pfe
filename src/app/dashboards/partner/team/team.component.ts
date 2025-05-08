import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './team.component.html'
})
export class TeamComponent {
  projectId: number;
  project: any;
  teamMembers: any[] = [];
  displayedColumns: string[] = ['image', 'name', 'email','role', 'action'];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.projectService.getProjectById(this.projectId,['DEVELOPER','MANAGER','TESTER']).subscribe(
      (data: any) => {
        this.project = data;
        this.teamMembers = data.affectedUsers || []; 
      },
      (error: any) => {
        console.error('Erreur lors du chargement du projet :', error);
      }
    );
  }

  viewProfile(member: any) {
    console.log('Profil de :', member);
  }
}
