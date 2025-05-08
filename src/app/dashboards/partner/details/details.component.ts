import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { TicketService } from '../../../services/ticket.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  @Input() status: string = 'In Progress';
  @Input() priority: string = 'High';
  @Input() tasks: string[] = [];
  @Input() imageUrl: string = '';
  @Input() category: string = 'Bug';
  @Input() description: string = '';
  @Input() date: string = ''; 
  @Input() level: string = ''; 
  @Input() loggerName: string = ''; 
  @Input() projectId?: number;
  @Input() ticket: any;

  role: string | null = null;
  ticketId!: number;
  assignedUser: any = null;
  affectedUsers: any[] = [];
  selectedUser: any = null;
  dropdownOpen = false;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private ticketService: TicketService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.role = this.getRole()?.toUpperCase() || null;

    if (!this.projectId) {
      this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    }

    this.ticketId = Number(this.route.snapshot.paramMap.get('ticketId'));

    this.loadProjectUsers();
    this.loadTicketDetails();
  }

  private loadProjectUsers(): void {
    if (this.projectId !== undefined) {
      this.projectService.getProjectById(this.projectId, ['DEVELOPER']).subscribe({
        next: (data: any) => {
          this.affectedUsers = data.affectedUsers || [];
        },
        error: (error) => {
          console.error('Erreur lors du chargement des utilisateurs :', error);
        }
      });
    } else {
      console.warn('Impossible de charger les utilisateurs : projectId est undefined.');
    }
  }
  

  private loadTicketDetails(): void {
    this.ticketService.getTicketById(String(this.ticketId)).subscribe({
      next: (ticketData: any) => {
        this.ticket = ticketData;
        this.loadAssignedUser(ticketData.assignedUserId);
      },
      error: (err) => {
        console.error('Erreur lors du chargement du ticket :', err);
      }
    });
    
  }

  private loadAssignedUser(userId: number): void {
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (user) => {
          this.assignedUser = user;
        },
        error: (err) => {
          console.error('Erreur lors du chargement de l’utilisateur assigné :', err);
        }
      });
    }
  }

  assignUser(): void {
    if (this.selectedUser) {
      this.ticketService.assignUserToTicket(this.ticketId, this.selectedUser.id).subscribe({
        next: (response) => {
          console.log('Utilisateur assigné avec succès:', response);
          this.assignedUser = this.selectedUser;
        },
        error: (error) => {
          console.error('Erreur lors de l\'assignation de l\'utilisateur:', error);
        }
      });
    }
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectUser(user: any): void {
    this.selectedUser = user;
    this.dropdownOpen = false;
  }

  private getRole(): string | null {
    return localStorage.getItem('role');
  }
}
