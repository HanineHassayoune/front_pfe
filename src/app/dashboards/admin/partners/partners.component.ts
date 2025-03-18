import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../../../services/register.service';
import { ActivationService } from '../../../services/activation.service';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [TableComponent,FormsModule],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.css'
})
export class PartnersComponent implements OnInit {
  // injection of services
  constructor(
    private registerService: RegisterService,
    private activationService: ActivationService
  ) {} 


  columns = [
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
  ];

  rows: { name: string; email: string }[] = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' }
  ]; 

 

  onTableActionClick(event: any) {
    console.log("Activation demandée pour l'utilisateur ID:", event.id);
    this.activationService.activeUser(event.id).subscribe({
      next: (response) => {
        console.log('Utilisateur activé avec succès:', response);
        this.loadUsers(); // Recharge la liste après activation
      },
      error: (err) => {
        console.error("Erreur lors de l'activation de l'utilisateur:", err);
      }
    });
  }

  ngOnInit() {
      this.loadUsers();
  }
  
    // get users 
    loadUsers() {
      this.registerService.getData().subscribe({
        next: (data) => {
          this.rows = data.map((user: any) => ({
            id:user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            enabled:user.enabled
          })); 
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des utilisateurs:', err);
        },
      });
    }

  
}



