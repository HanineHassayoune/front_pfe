import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { AlertComponent } from '../../../components/alert/alert.component';
import { CommonModule } from '@angular/common';
import { TableActionComponent } from '../../../components/table-action/table-action.component';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [TableComponent,FormsModule,AlertComponent,CommonModule,TableActionComponent],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.css'
})
export class PartnersComponent implements OnInit {
  // injection of services
  constructor(
    private userService: UserService,
  
  ) {} 


  columns = [
    { field: 'name', header: 'Name' ,},
    { field: 'email', header: 'Email' },
    
  ];

  rows: { id: number; name: string; email: string ; enabled: boolean }[] = []; 


  alertType: 'success' | 'danger' | 'warning' | 'info' = 'info';
  alertMessage: string = '';
  alertVisible: boolean = false;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getPartners().subscribe({
      next: (data) => {
        this.rows = data.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          enabled: user.enabled,
        }));
      },
      error: (err) => {
        console.error('Error while loading users', err);
      }
    });
  }

  onTableAction(event: { id: number; action: string }) {
    if (event.action === 'approve') {
      this.userService.activeUser(event.id).subscribe(() => {
        console.log('Utilisateur activé avec succès');
        this.loadUsers(); 
      });
    } else {
      this.userService.blockUser(event.id).subscribe(() => {
        console.log('Utilisateur bloqué avec succès');
        this.loadUsers(); 
      });
    }
  }
  
}







