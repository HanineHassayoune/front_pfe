import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from '../../../components/pie-chart/pie-chart.component';
import { RegisterService } from '../../../services/register.service';
import { ModalComponent } from '../../../components/modal/modal.component';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from '../../../components/alert/alert.component';



@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableComponent,CommonModule,PieChartComponent,ModalComponent,ReactiveFormsModule,AlertComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  columns = [
    { field: 'name', header: 'Nom' },
    { field: 'email', header: 'Email' },
    { field: 'role', header: 'Role' },
    { field: 'enabled', header: 'Status' },
  ];

  rows: { id: number; name: string; email: string ; role:String ; enabled: boolean }[] = []; 

  isModalOpen = false;
  userForm: FormGroup;

  alertType: 'success' | 'danger' | 'warning' | 'info' = 'info';
  alertMessage: string = '';
  alertVisible: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadUsers();
  }
  
  // get users whith role TESTER , DEVELOPER , MANAGER
  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.rows = data
          .map((user: any) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            role:user.role,
            enabled: user.enabled
          }));
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des utilisateurs:', err);
      }
    });
  }

    // to activate and block users (TESTER,MANAGER,DEVELOPER)
    onTableActionClick(event: any) {
      console.log("Action received:", event);
    
      if (!event.id || !event.action) {
        console.error("Invalid event data:", event);
        return;
      }
    
      // Trouver l'utilisateur dans la liste actuelle
      const user = this.rows.find(user => user.id === event.id);
    
      if (!user) {
        console.error("User not found in the list:", event.id);
        return;
      }
    
      if (event.action === 'approve') {
        if (user.enabled) {
          this.alertType = 'warning';
          this.alertMessage = 'Partner is already approved!';
          this.alertVisible = true;
          setTimeout(() => { this.alertVisible = false; }, 5000);
          return; // Empêcher l'appel à l'API
        }
    
        console.log("Activating user ID:", event.id);
        this.userService.activeUser(event.id).subscribe({
          next: (response) => {
            console.log('User activated successfully:', response);
            this.alertType = 'success';
            this.alertMessage = 'Partner was approved successfully!';
            this.alertVisible = true;
            setTimeout(() => { this.alertVisible = false; }, 5000);
            this.loadUsers();
          },
          error: (err) => {
            console.error("Error while activating the user:", err);
            this.alertType = 'danger';
            this.alertMessage = 'Error occurred while approving the user!';
            setTimeout(() => { this.alertVisible = false; }, 5000);
            this.alertVisible = true;
          }
        });
    
      } else if (event.action === 'block') {
        if (!user.enabled) {
          this.alertType = 'warning';
          this.alertMessage = 'User is already blocked!';
          this.alertVisible = true;
          setTimeout(() => { this.alertVisible = false; }, 5000);
          return; // Empêcher l'appel à l'API
        }
    
        console.log("Blocking user ID:", event.id);
        this.userService.blockUser(event.id).subscribe({
          next: (response) => {
            console.log('User blocked successfully:', response);
            this.alertType = 'success';
            this.alertMessage = 'User was blocked successfully!';
            this.alertVisible = true;
            setTimeout(() => { this.alertVisible = false; }, 5000);
            this.loadUsers();
          },
          error: (err) => {
            console.error("Error while blocking the user:", err);
            this.alertType = 'danger';
            this.alertMessage = 'Error occurred while blocking the user!';
            setTimeout(() => { this.alertVisible = false; }, 5000);
            this.alertVisible = true;
          }
        });
      }
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
      // Si le formulaire est valide, ajouter l'utilisateur
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
      });
    } else {
      // if form was not valid : warning
      this.alertType = 'warning';
      this.alertMessage = 'Please fill in all required fields correctly.';
      this.alertVisible = true;
      setTimeout(() => { this.alertVisible = false; }, 5000);
    }
  }
}
