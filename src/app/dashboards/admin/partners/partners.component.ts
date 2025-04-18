import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { AlertComponent } from '../../../components/alert/alert.component';
import { CommonModule } from '@angular/common';
import { TablePaginationComponent } from '../../../components/table-pagination/table-pagination.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [FormsModule, AlertComponent, CommonModule, TablePaginationComponent,MatProgressSpinnerModule],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.css'
})
export class PartnersComponent implements OnInit {
  constructor(
    private userService: UserService,
  ) { }

  columns = [
    { field: 'profileImage', header: 'Image' },
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'role', header: 'Role' },
    { field: 'action', header: 'Action' }
  ];

  rows: { id: number; profileImage: string; name: string; email: string; role: string; enabled: boolean }[] = [];


  alertType: 'success' | 'danger' | 'warning' | 'info' = 'info';
  alertMessage: string = '';
  alertVisible: boolean = false;

  ngOnInit() {
    this.loadUsers();
  }

  currentPage: number = 0;
  pageSize: number = 5;
  filterName: string = ''; // Filter to search
  totalRows: number = 0;

  loadUsers() {
    this.userService.getUsers(['PARTNER'], this.filterName, this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.rows = res.content;
        this.totalRows = res.totalElements;
      },
      error: (err) => {
        console.error('Error loading users.', err);
      }
    });
  }
  

  // Gestion du changement de page
  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadUsers();
  }

  isLoading: boolean = false;

onTableAction(event: { id: number; action: string }) {
  this.isLoading = true;
  const successMsg = event.action === 'approve' ? 'Partner successfully activated' : 'Partner successfully blocked.';
  const serviceCall = event.action === 'approve'
    ? this.userService.activeUser(event.id)
    : this.userService.blockUser(event.id);

  serviceCall.subscribe({
    next: () => {
      this.alertType = 'success';
      this.alertMessage = successMsg;
      this.alertVisible = true;
      setTimeout(() => { this.alertVisible = false; }, 2000);
      this.loadUsers();
    },
    error: (err) => {
      console.error('Error during user action.', err);
      this.alertType = 'danger';
      this.alertMessage = 'An error occurred.';
      this.alertVisible = true;
    },
    complete: () => {
      this.isLoading = false;
    }
  });
}

}
