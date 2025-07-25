import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from '../../../components/pie-chart/pie-chart.component';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from '../../../components/alert/alert.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TablePaginationComponent } from '../../../components/table-pagination/table-pagination.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';

import { ConfirmationDialogComponent } from '../../../components/confirmation-dialog/confirmation-dialog.component'; 
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { UserProfileDialogComponent } from '../user-profile-dialog/user-profile-dialog.component';
import { environment } from '../../../../environment/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,PieChartComponent,
    ReactiveFormsModule,AlertComponent,MatProgressSpinnerModule,
    FormsModule,
    AddUserDialogComponent,UserProfileDialogComponent,MatTableModule, MatButtonModule, TablePaginationComponent,MatDialogModule
  ],
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
    private fb: FormBuilder,private dialog: MatDialog 
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
        action: 'view'
      },
      error: (err) => {
        console.error('Error loading users.', err);
      }
    });
  }
  

  onTableAction(event: { id: number; action: string; user?: any }) {
   if (event.action === 'view' && event.user) {
    const userId = event.user.id;

    this.userService.getUserProfileById(userId).subscribe({
      next: (profile) => {
        profile.profileImage = profile.profileImage
          ? environment.imageUrl + profile.profileImage
          : 'assets/images/default-user.jpg';
          
        this.viewProfile(profile);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du profil utilisateur', err);
      }
    });
  }
  else if (event.action === 'update') {
    this.openUpdateDialog(event.user); 
  } else {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `Are you sure you want to ${event.action} this user?` },
      width: '450px',
      height: '200px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.triggerUserAction(event.id, event.action);
      }
    });
  }
}

    
openUpdateDialog(user: any) {
  const dialogRef = this.dialog.open(EditUserDialogComponent, {
    width: '500px',
    data: user, 
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.isLoading = true;
      this.userService.updateUserRoleAndName(user.id, result).subscribe({
        next: () => {
          this.alertType = 'success';
          this.alertMessage = 'User successfully updated!';
          this.alertVisible = true;
          this.loadUsers();
          setTimeout(() => { this.alertVisible = false; }, 3000);
        },
        error: (err) => {
          console.error('Error updating user:', err);
          this.alertType = 'danger';
          this.alertMessage = 'Failed to update user .';
          this.alertVisible = true;
          setTimeout(() => { this.alertVisible = false; }, 3000);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  });
}


    triggerUserAction(id: number, action: string) {
      this.isLoading = true;
      const successMsg = action === 'approve'
        ? 'User successfully activated.'
        : 'User successfully blocked.';
  
      const serviceCall = action === 'approve'
        ? this.userService.activeUser(id)
        : this.userService.blockUser(id);
  
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
      (document.activeElement as HTMLElement)?.blur();
    
      const dialogRef = this.dialog.open(AddUserDialogComponent, {
        width: '450px',
        panelClass: 'custom-dialog-container'
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.submitUser(result);
        }
      });
    }
    
    
    
 
  // add user by the partner
  submitUser(formData: any) {
    this.isLoading = true;
    this.userService.addUser(formData).subscribe({
      next: () => {
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
        this.isLoading = false;
      }
    });
  }
  

  

viewProfile(profile: any) {
  this.dialog.open(UserProfileDialogComponent, {
    data: {
      name: profile.name,
      email: profile.email,
      role: profile.role,
      projects: profile.projects, 
      image: profile.profileImage || 'assets/images/default-user.jpg'
    },
    width: '600px',
    height: 'auto',
    panelClass: 'custom-dialog'
  });
}

  
}
