import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AlertComponent } from '../alert/alert.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { RoleBadgeComponent } from '../role-badge/role-badge.component';
@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [AlertComponent, CommonModule, FormsModule,RoleBadgeComponent],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user: any = { name: '', email: '', profileImage: '' };
  currentPassword: string = '';
  newPassword: string = '';
  confirmationPassword: string = '';
  selectedImage: File | null = null;
  alertVisible: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'danger' | 'warning' | 'info' | 'dark' = 'info';
  originalUserName: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
    if (user) {
      this.user = user;
      this.originalUserName = user.name;
    }
  });
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getConnectedUser().subscribe({
      next: (res) => {
        this.user = res; 
        this.originalUserName = res.name;
      },
      error: (err) => {
        this.alertType = 'danger';
        this.alertMessage = 'Error loading users.';
        this.alertVisible = true;
        setTimeout(() => { this.alertVisible = false; }, 2000);
      }
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  updateProfile(): void {
    //if there is no modification
    const nameUnchanged = this.user.name.trim() === this.originalUserName.trim();
    const noImageChange = !this.selectedImage;
    const noPasswordChange = this.currentPassword.trim() === '' &&
                             this.newPassword.trim() === '' &&
                             this.confirmationPassword.trim() === '';
  
    if (nameUnchanged && noImageChange && noPasswordChange) {
      this.alertType = 'warning';
      this.alertMessage = 'No changes detected.';
      this.alertVisible = true;
      setTimeout(() => { this.alertVisible = false; }, 2000);
      return;
    }
  
    
    if (this.newPassword !== this.confirmationPassword) {
      this.alertType = 'warning';
      this.alertMessage = 'New password and confirmation do not match.';
      this.alertVisible = true;
      setTimeout(() => { this.alertVisible = false; }, 2000);
      return;
    }
  
    const profileData = {
      name: this.user.name,
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      confirmationPassword: this.confirmationPassword,
      profileImage: this.selectedImage ?? undefined
    };
  
    this.userService.updateProfile(profileData).subscribe({
      next: () => {
        this.alertType = 'success';
        this.alertMessage = 'Profile updated successfully!';
        this.alertVisible = true;
        setTimeout(() => { this.alertVisible = false; }, 2000);
  
        // Resetting fields
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmationPassword = '';
        this.selectedImage = null;
        this.loadUserProfile(); 
      },
      error: (err) => {
        this.alertType = 'danger';
        this.alertMessage = err.error?.message || 'An error occurred.';
        this.alertVisible = true;
        setTimeout(() => { this.alertVisible = false; }, 2000);
      }
    });
  }
  
}


  
  
  
  
  
  
  
  
