import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProjectService } from '../../services/project.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TicketService } from '../../services/ticket.service';
import { AlertComponent } from '../../components/alert/alert.component';

@Component({
  selector: 'app-add-ticket-dialog',
  standalone: true,
  imports: [MatIconModule,MatProgressSpinnerModule,CommonModule, ReactiveFormsModule, FormsModule,AlertComponent],
  templateUrl: './add-ticket-dialog.component.html',
  styleUrl: './add-ticket-dialog.component.css'
})
export class AddTicketDialogComponent {
  projectId: number = 0;
  project: any;
  ticketForm: FormGroup;
  developers: any[] = [];
 alertVisible: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'danger' | 'warning' | 'info' | 'dark' = 'info';
  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private dialogRef: MatDialogRef<AddTicketDialogComponent>,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: { projectId: number }
  ) {
    this.projectId = data.projectId;
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      status: [''],
      priority: [''],
      level: [''],
      date: [new Date().toISOString()],
      projectName: [''],
      projectId: [null], // fix here
      loggerName: [''],
      category: [''],
      stackTrace: [''],
      imageUrl: [null],
      assignedUserId: [null]
    });
  }

  ngOnInit(): void {
    this.ticketForm.get('projectId')?.setValue(this.projectId); // fix here
    this.loadProject();
  }
loadProject() {
  this.projectService.getProjectById(this.projectId, ['DEVELOPER', 'MANAGER', 'TESTER'])
    .subscribe({
      next: (data) => {
        this.project = data;

        this.ticketForm.get('projectName')?.setValue(this.project.title || '');

        this.developers = this.project.affectedUsers?.filter((user: any) => user.role === 'DEVELOPER');
        console.log('Développeurs assignables :', this.developers);
      },
      error: (err) => {
        console.error('Erreur lors du chargement du projet :', err);
      }
    });
}


  close(): void {
    this.dialogRef.close();
  }

  submit() {
  const formValue = this.ticketForm.value;

  // Convert projectName if needed
  if (!formValue.projectName && this.project?.title) {
    formValue.projectName = this.project.title;
  }

  // Cast assignedUserId and projectId to numbers
  formValue.assignedUserId = Number(formValue.assignedUserId);
  formValue.projectId = Number(formValue.projectId);

  if (this.ticketForm.valid) {
    this.ticketService.createManualTicket(formValue).subscribe({
      next: res => {
        console.log(res);
        this.alertType = 'success';
        this.alertMessage = 'Ticket created!';
        this.alertVisible = true;
        setTimeout(() => {
          this.alertVisible = false;
          this.dialogRef.close(true);
        }, 2000);

      },
      error: err => {
        console.error(err);
        this.alertType = 'danger';
        this.alertMessage = 'Error creating ticket.';
        this.alertVisible = true;
        setTimeout(() => { this.alertVisible = false; }, 2000);

      }
    });
  } else {
    console.warn("❌ Form is invalid", this.ticketForm.value);
  }
}


imagePreview: string | null = null;

handlePaste(event: ClipboardEvent): void {
  const items = event.clipboardData?.items;
  if (!items) return;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile();
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result as string;
          this.ticketForm.patchValue({ imageUrl: this.imagePreview });
        };
        reader.readAsDataURL(file);
      }
    }
  }
}


}