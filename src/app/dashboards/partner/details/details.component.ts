import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { TicketService } from '../../../services/ticket.service';
import { UserService } from '../../../services/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertComponent } from '../../../components/alert/alert.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,MatProgressSpinnerModule,AlertComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  @Input() status: string = '';
  @Input() priority: string = '';
  @Input() tasks: string[] = [];
  @Input() imageUrl: string = '';
  @Input() category: string = '';
  @Input() description: string = '';
  @Input() date: string = ''; 
  @Input() level: string = ''; 
  @Input() loggerName: string = ''; 
  @Input() projectId?: number;
  @Input() ticket: any;
  @Input() projectName: string = '';

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

  isLoadingAssignUser = false;
  isLoadingUpdateStatus = false;

  alertType: 'success' | 'danger' | 'warning' | 'info' = 'info';
  alertMessage = '';
  alertVisible = false;

  showAlert(type: 'success' | 'danger' | 'warning' | 'info', message: string) {
    this.alertType = type;
    this.alertMessage = message;
    this.alertVisible = true;
    setTimeout(() => {
      this.alertVisible = false;
    }, 2000);
  }

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
        this.imageUrl = ticketData.imageUrl?.trim() || '';
        this.loadAssignedUser(ticketData.assignedUserId);
         this.projectName = ticketData.projectName
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
  if (!this.selectedUser) {
    this.showAlert('warning', 'Please select a user before assigning.');
    return;
  }

  this.isLoadingAssignUser = true;
  this.ticketService.assignUserToTicket(this.ticketId, this.selectedUser.id).subscribe({
    next: (response) => {
      this.assignedUser = this.selectedUser;
      this.showAlert('success', 'User assigned successfully!');
      this.isLoadingAssignUser = false;
    },
    error: (error) => {
      console.error('Error assigning user:', error);
      this.showAlert('danger', 'Failed to assign user.');
      this.isLoadingAssignUser = false;
    }
  });
}

updatePriority(): void {
  if (!this.selectedPriority || !this.ticketId) {
    this.showAlert('warning', 'Please select a priority before updating.');
    return;
  }

  this.isLoadingUpdateStatus = true;
  this.ticketService.updateTicketPriority(this.ticketId, this.selectedPriority).subscribe({
    next: (updatedTicket) => {
      this.priority = updatedTicket.priority;
      this.showAlert('success', 'Priority updated successfully!');
      this.isLoadingUpdateStatus = false;
    },
    error: (error) => {
      console.error('Error updating priority:', error);
      this.showAlert('danger', 'Failed to update priority.');
      this.isLoadingUpdateStatus = false;
    }
  });
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


priorities: string[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL','URGENT'];

selectedPriority: string = '';
priorityDropdownOpen = false;

togglePriorityDropdown(): void {
  this.priorityDropdownOpen = !this.priorityDropdownOpen;
}

selectPriority(priority: string): void {
  this.selectedPriority = priority;
  this.priorityDropdownOpen = false;
}

priorityIcons: { [key: string]: string } = {
  HIGH: '🔥',
  MEDIUM: '⚠️',
  LOW: '✅',
  CRITICAL: '🚨',
  URGENT: '⚡',
};

}
