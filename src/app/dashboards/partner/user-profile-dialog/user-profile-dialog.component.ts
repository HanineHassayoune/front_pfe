import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleBadgeComponent } from '../../../components/role-badge/role-badge.component';

@Component({
  selector: 'app-user-profile-dialog',
  standalone: true,
  imports:[CommonModule,RoleBadgeComponent],
  templateUrl: './user-profile-dialog.component.html',
  styleUrls: ['./user-profile-dialog.component.css']
})
export class UserProfileDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}


  
}
