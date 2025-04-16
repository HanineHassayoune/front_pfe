import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AlertComponent } from '../../../components/alert/alert.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [AlertComponent, CommonModule, FormsModule],
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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Charge les données de l'utilisateur au démarrage
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getConnectedUser().subscribe({
      next: (res) => {
        this.user = res; // On met à jour l'utilisateur avec les données récupérées
      },
      error: (err) => {
        this.alertType = 'danger';
        this.alertMessage = 'Erreur lors du chargement du profil.';
        this.alertVisible = true;
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
    const profileData = {
      name: this.user.name,
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      confirmationPassword: this.confirmationPassword,
      profileImage: this.selectedImage ?? undefined
    };

    // Appel de l'API pour mettre à jour le profil
    this.userService.updateProfile(profileData).subscribe({
      next: () => {
        this.alertType = 'success';
        this.alertMessage = 'Profil mis à jour avec succès !';
        this.alertVisible = true;
      },
      error: (err) => {
        this.alertType = 'danger';
        this.alertMessage = err.error?.message || 'Une erreur est survenue.';
        this.alertVisible = true;
      }
    });
  }
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

  
  
  
  
  
  
  
  
  
