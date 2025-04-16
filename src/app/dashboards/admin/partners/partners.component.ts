import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { AlertComponent } from '../../../components/alert/alert.component';
import { CommonModule } from '@angular/common';
import { TableActionComponent } from '../../../components/table-action/table-action.component';
import { TablePaginationComponent } from '../../../components/table-pagination/table-pagination.component';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [TableComponent, FormsModule, AlertComponent, CommonModule, TableActionComponent, TablePaginationComponent],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.css'
})
export class PartnersComponent implements OnInit {
  constructor(
    private userService: UserService,
  ) { }

  columns = [
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'role', header: 'Role' },
    { field: 'action', header: 'Action' }
  ];

  rows: { id: number; name: string; email: string; role: string; enabled: boolean }[] = [];

  alertType: 'success' | 'danger' | 'warning' | 'info' = 'info';
  alertMessage: string = '';
  alertVisible: boolean = false;

  ngOnInit() {
    this.loadUsers();
  }

  currentPage: number = 0;
  pageSize: number = 5;
  filterName: string = ''; // Filtre de recherche
  totalRows: number = 0;

  loadUsers() {
    // Utilisation du filtre pour récupérer les données
    this.userService.getPartners(this.filterName, this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.rows = res.content;
        this.totalRows = res.totalElements;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs', err);
      }
    });
  }

  // Gestion du changement de page
  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadUsers();
  }

  // Gestion des actions de table (activer ou bloquer un utilisateur)
  onTableAction(event: { id: number; action: string }) {
    if (event.action === 'approve') {
      this.userService.activeUser(event.id).subscribe(() => {
        this.alertType = 'success';
        this.alertMessage = 'Utilisateur activé avec succès';
        this.alertVisible = true;
        setTimeout(() => { this.alertVisible = false; }, 2000);
        this.loadUsers();  
      });
    } else {
      this.userService.blockUser(event.id).subscribe(() => {
        this.alertType = 'success';
        this.alertMessage = 'Utilisateur bloqué avec succès';
        this.alertVisible = true;
        setTimeout(() => { this.alertVisible = false; }, 2000);
        this.loadUsers(); 
      });
    }
  }
}
