import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { AlertComponent } from '../../../components/alert/alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [TableComponent,FormsModule,AlertComponent,CommonModule],
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
    { field: 'enabled', header: 'Status' },
  ];

  rows: { id: number; name: string; email: string ; enabled: boolean }[] = []; 


  alertType: 'success' | 'danger' | 'warning' | 'info' = 'info';
  alertMessage: string = '';
  alertVisible: boolean = false;



  // to activate and block partners 
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
          this.alertMessage = 'Error occurred while approving the partner!';
          setTimeout(() => { this.alertVisible = false; }, 5000);
          this.alertVisible = true;
        }
      });
  
    } else if (event.action === 'block') {
      if (!user.enabled) {
        this.alertType = 'warning';
        this.alertMessage = 'Partner is already blocked!';
        this.alertVisible = true;
        setTimeout(() => { this.alertVisible = false; }, 5000);
        return; // Empêcher l'appel à l'API
      }
  
      console.log("Blocking user ID:", event.id);
      this.userService.blockUser(event.id).subscribe({
        next: (response) => {
          console.log('User blocked successfully:', response);
          this.alertType = 'success';
          this.alertMessage = 'Partner was blocked successfully!';
          this.alertVisible = true;
          setTimeout(() => { this.alertVisible = false; }, 5000);
          this.loadUsers();
        },
        error: (err) => {
          console.error("Error while blocking the user:", err);
          this.alertType = 'danger';
          this.alertMessage = 'Error occurred while blocking the partner!';
          setTimeout(() => { this.alertVisible = false; }, 5000);
          this.alertVisible = true;
        }
      });
    }
  }
  
 
  ngOnInit() {
      this.loadUsers();
  }
  
  // get users sauf with role PARTNER
  loadUsers() {
    this.userService.getPartners().subscribe({
      next: (data) => {
        this.rows = data
          .map((user: any) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            enabled: user.enabled
          }));
      },
      error: (err) => {
        console.error('Error while getting the users:', err);
      }
    });
  }

  
}



