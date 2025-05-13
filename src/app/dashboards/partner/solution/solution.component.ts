import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AddSolutionDialogComponent } from '../add-solution-dialog/add-solution-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '../../../services/storage.service';


@Component({
  selector: 'app-solution',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.css'
})
export class SolutionComponent implements OnInit{
  @Input() isVerified!: boolean;
  @Input() ticketTitle: string = 'Fix login bug';
  @Input() solutionText: string = 'You should use FormBuilder to simplify reactive forms in Angular.';
  @Input() description: string = 'This solution suggests using Angular FormBuilder for concise and readable reactive form definitions.';
  @Input() technologies: string = 'Angular, TypeScript, Reactive Forms';
  @Input() referenceLink?: string = 'https://angular.io/guide/reactive-forms';
  @Input() author: string = 'Hanin 😎';
  @Input() datePosted: string = 'April 22, 2025';
  
  
  role: string | null = null;
  @Input() ticketId!: number;
  @Input() userId!: number; 

  constructor(private dialog: MatDialog,private storageService:StorageService) {}

  ngOnInit(): void {
    this.role = this.storageService.getRole()?.toUpperCase() || null;
  
  }
  onAddSolution(): void {
    console.log('Open dialog with ticketId:', this.ticketId, 'and userId:', this.userId); // debug

    this.dialog.open(AddSolutionDialogComponent, {
      width: '600px',
      data: {
         ticketId: this.ticketId,
         userId: this.userId 
      }
    });
  }


}