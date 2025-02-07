import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from '../../components/pie-chart/pie-chart.component';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableComponent,CommonModule,PieChartComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  // Colonnes de la table
columns = [
  { field: 'name', header: 'Nom' },
  { field: 'role', header: 'Rôle' },
  { field: 'birthdate', header: 'Date de Naissance' },
  { field: 'cin', header: 'CIN' },
  { field: 'email', header: 'Email' },
  
  
];

// Exemple de données à afficher
rows = [
  {
    name: 'Alice Dupont',
    role: 'Testeur',
    birthdate: '1995-03-12',
    cin: '12345678',
    email: 'alice.dupont@example.com',
  },
  {
    name: 'Bob Martin',
    role: 'Développeur',
    birthdate: '1990-06-24',
    cin: '87654321',
    email: 'bob.martin@example.com',
  },
  {
    name: 'Charlie Bernard',
    role: 'Admin',
    birthdate: '1985-11-15',
    cin: '12349876',
    email: 'charlie.bernard@example.com',
  },
  {
    name: 'Diane Durand',
    role: 'Testeur',
    birthdate: '2000-01-30',
    cin: '56473829',
    email: 'diane.durand@example.com',
  }
];

isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  submitUser() {
    alert('Utilisateur est ajouté avec succès !');
    this.closeModal();
  }

}
