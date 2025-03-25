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
  ];

  rows: { name: string; email: string;role:String }[] = [];
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

 acceptUser(id: number) {
    /* this.acceptationService.registerUser(id).subscribe({
      next: (response) => {
        if (response) {
          alert('Utilisateur accepté avec succès !');
          this.loadUsers(); 
        } else {
          alert('Erreur: L’utilisateur n’a pas pu être accepté.');
        }
      },
      error: (err) => {
        console.error('Erreur lors de l’acceptation de l’utilisateur:', err);
      }
    }); */
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
