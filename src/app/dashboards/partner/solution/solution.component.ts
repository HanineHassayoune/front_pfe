import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AddSolutionDialogComponent } from '../add-solution-dialog/add-solution-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '../../../services/storage.service';
import { SolutionService } from '../../../services/solution.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-solution',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe], // Add DatePipe to the providers
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})
export class SolutionComponent implements OnInit {
  @Input() isVerified!: boolean;
  @Input() ticketTitle: string = 'Fix login bug';
  @Input() solutionText: string = '';
  @Input() description: string = '';
  @Input() referenceLink?: string = '';
  @Input() author: string = ''; // We will update this dynamically
  @Input() datePosted: string = '';

  @Input() ticketId!: number;
  @Input() userId!: number;
  @Input() solutionId!: number;
  code: string = '';
  role: string | null = null;

  constructor(
    private dialog: MatDialog,
    private storageService: StorageService,
    private solutionService: SolutionService,
    private userService: UserService,
    private datePipe: DatePipe // Inject DatePipe
  ) {}

  ngOnInit(): void {
    this.role = this.storageService.getRole()?.toUpperCase() || null;

    // Fetch user by userId
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (user) => {
          // Use user name or email here
          this.author =  user.email; // Set the author dynamically
        },
        error: (err) => {
          console.error('Error fetching user by ID', err);
        }
      });
    }

    // Fetch solution data
    if (this.ticketId) {
      this.solutionService.getSolutionByTicketId(this.ticketId).subscribe({
        next: (solution) => {
          this.solutionText = solution.description;
          this.referenceLink = solution.reference;
          this.code = solution.code;

          // Format and set the datePosted using DatePipe
          this.datePosted = this.datePipe.transform(solution.datePosted, 'MMMM d, yyyy') || ''; // Format the date dynamically
        },
        error: (err) => {
          console.error('Error loading solution', err);
        }
      });
    }
  }

  // Method to open the add solution dialog
  onAddSolution(): void {
    this.dialog.open(AddSolutionDialogComponent, {
      width: '600px',
      data: {
        ticketId: this.ticketId,
        userId: this.userId
      }
    });
  }
}
