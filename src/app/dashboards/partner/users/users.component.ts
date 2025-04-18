import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from '../../../components/pie-chart/pie-chart.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from '../../../components/alert/alert.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TablePaginationComponent } from '../../../components/table-pagination/table-pagination.component';



@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,PieChartComponent,ModalComponent,ReactiveFormsModule,AlertComponent,MatProgressSpinnerModule,FormsModule,TablePaginationComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  columns = [
    { field: 'profileImage', header: 'Image' },
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'role', header: 'Role' },
    { field: 'action', header: 'Action' }
  ];

  rows: { id: number;profileImage:string; name: string; email: string; role: string; enabled: boolean }[] = [];

  isLoading: boolean = false;
  

  isModalOpen = false;
  userForm: FormGroup;

  alertType: 'success' | 'danger' | 'warning' | 'info' = 'info';
  alertMessage: string = '';
  alertVisible: boolean = false;

  currentPage: number = 0;
  pageSize: number = 5;
  filterName: string = ''; 
  totalRows: number = 0;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadUsers();
  }
  


  // Gestion du changement de page
  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(['TESTER', 'DEVELOPER', 'MANAGER'], this.filterName, this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.rows = res.content;
        this.totalRows = res.totalElements;
      },
      error: (err) => {
        console.error('Error loading users.', err);
      }
    });
  }
  

    // to activate and block users (TESTER,MANAGER,DEVELOPER)
    onTableAction(event: { id: number; action: string }) {
      this.isLoading = true;
      const successMsg = event.action === 'approve' ? 'User successfully activated' : 'User successfully blocked.';
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
    

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  // add user by the partner
  submitUser() {
    if (this.userForm.valid) {
      this.isLoading = true; // <-- Démarre le spinner
  
      this.userService.addUser(this.userForm.value).subscribe({
        next: () => {
          this.closeModal();
          this.alertType = 'success';
          this.alertMessage = 'User added successfully!';
          this.alertVisible = true;
          this.loadUsers();
  
          setTimeout(() => { this.alertVisible = false; }, 5000);
        },
        error: (err) => {
          console.error('Error adding user:', err);
          this.alertType = 'danger';
          this.alertMessage = 'Error adding user. Please try again.';
          this.alertVisible = true;
  
          setTimeout(() => { this.alertVisible = false; }, 5000);
        },
        complete: () => {
          this.isLoading = false; // <-- Stoppe le spinner
        }
      });
    } else {
      this.alertType = 'warning';
      this.alertMessage = 'Please fill in all required fields correctly.';
      this.alertVisible = true;
      setTimeout(() => { this.alertVisible = false; }, 5000);
    }
  }
  
}
