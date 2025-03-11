import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from '../../../components/pie-chart/pie-chart.component';
import { RegisterService } from '../../../services/register.service';
import { ModalComponent } from '../../../components/modal/modal.component';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableComponent,CommonModule,PieChartComponent,ModalComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  columns = [
    { field: 'name', header: 'Nom' },
    { field: 'email', header: 'Email' },
  ];

  rows: { name: string; email: string }[] = [];



  constructor(
    private registerService: RegisterService,

  ) {} // Injection of service

  ngOnInit() {
    this.loadUsers();
  }

  // get users which they demand for registration 
  loadUsers() {
    this.registerService.getData().subscribe({
      next: (data) => {
        this.rows = data.map((user: any) => ({
          id:user.id,
          name: user.name,
          email: user.email,
        })); 
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des utilisateurs:', err);
      },
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
 

 /*  onTableActionClick(event: any) {
    console.log("Action clicked:", event);
  }
   */

  isModalOpen = false;

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
  submitUser() {
    alert('Utilisateur est ajouté avec succès !');
    this.closeModal();
  }

}
