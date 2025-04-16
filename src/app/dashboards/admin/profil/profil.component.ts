import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { AlertComponent } from '../../../components/alert/alert.component';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertComponent],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user: any = {
    name: '',
    email: '',
    profileImage: ''
  };

  currentPassword = '';
  newPassword = '';
  confirmationPassword = '';

  alertType: 'success' | 'danger' | 'warning' | 'info' = 'info';
  alertMessage: string = '';
  alertVisible: boolean = false;

  originalName = '';
  originalPassword = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getConnectedUser().subscribe({
      next: (data) => {
        this.user = data;
        this.originalName = data.name;
        this.originalPassword = data.password; // Enregistre le mot de passe initial
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du user connecté', err);
      }
    });
  }

  updateName() {
    if (this.user.name === this.originalName) {
      this.alertType = 'warning';
      this.alertMessage = 'No changes made to the name.';
      this.alertVisible = true;
      setTimeout(() => { this.alertVisible = false; }, 2000);
      return;
    }
  
    this.userService.updateProfile({ name: this.user.name }).subscribe({
      next: () => {
        this.alertType = 'success';
        this.alertMessage = 'Name successfully updated';
        this.alertVisible = true;
        setTimeout(() => { this.alertVisible = false; }, 2000);
      },
      error: (err) => {
        this.alertType = 'danger';
        this.alertMessage = 'Error: ' + err.error.message;
        this.alertVisible = true;
        setTimeout(() => { this.alertVisible = false; }, 2000);
      }
    });
  }
  
  updatePassword() {
    // Checking fields before making the request
    if (!this.currentPassword || !this.newPassword || !this.confirmationPassword) {
      this.alertType = 'warning';
      this.alertMessage = 'All fields must be filled out.';
      this.alertVisible = true;
      setTimeout(() => { this.alertVisible = false; }, 2000);
      return;  // Stop function here if fields are not filled
    }
  
    if (this.newPassword !== this.confirmationPassword) {
      this.alertType = 'warning';
      this.alertMessage = 'The confirmation password does not match the new password.';
      this.alertVisible = true;
      setTimeout(() => { this.alertVisible = false; }, 2000);
      return;  // Stop here if passwords don't match
    }
  
    if (this.currentPassword === this.newPassword) {
      this.alertType = 'warning';
      this.alertMessage = 'The current password cannot be the same as the new password.';
      this.alertVisible = true;
      setTimeout(() => { this.alertVisible = false; }, 2000);
      return;  // Stop here if passwords are identical
    }
  
  
  
    // Vérification que le mot de passe actuel est correct
    /* this.userService.checkCurrentPassword(this.currentPassword).subscribe({
      next: (response) => {
        if (response.isValid) {
          const body = {
            currentPassword: this.currentPassword,
            newPassword: this.newPassword,
            confirmationPassword: this.confirmationPassword
          };
  
          this.userService.updateProfile(body).subscribe({
            next: () => {
              this.alertType = 'success';
              this.alertMessage = 'Mot de passe mis à jour avec succès';
              this.alertVisible = true;
              setTimeout(() => { this.alertVisible = false; }, 2000);
            },
            error: (err) => {
              this.alertType = 'danger';
              this.alertMessage = 'Erreur : ' + (err.error?.message || 'Une erreur inconnue est survenue.');
              this.alertVisible = true;
              setTimeout(() => { this.alertVisible = false; }, 2000);
            }
          });
        } else {
          this.alertType = 'danger';
          this.alertMessage = 'Le mot de passe actuel est incorrect.';
          this.alertVisible = true;
          setTimeout(() => { this.alertVisible = false; }, 2000);
        }
      },
      error: (err:any) => {
        this.alertType = 'danger';
        this.alertMessage = 'Erreur lors de la vérification du mot de passe actuel.';
        this.alertVisible = true;
        setTimeout(() => { this.alertVisible = false; }, 2000);
      }
    }); */
  }
  
  
}


 /*  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        this.userService.updateProfile({ profileImage: base64Image }).subscribe({
          next: () => {
            alert('Image de profil mise à jour avec succès');
            this.user.profileImage = base64Image; 
          },
          error: (err) => alert('Erreur : ' + err.error.message)
        });
      };
      reader.readAsDataURL(file); 
    }
  } */
  
 

