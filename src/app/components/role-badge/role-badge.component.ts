import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="px-2 py-1 rounded-full text-sm font-medium"
      [ngClass]="getBadgeClass(role)"
    >
      {{ role }}
    </span>
  `
})
export class RoleBadgeComponent {
  @Input() role: string = '';

  getBadgeClass(role: string): string {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-600';
      case 'manager':
        return 'bg-blue-100 text-blue-600';
      case 'tester':
        return 'bg-green-100 text-green-600';
      case 'developer':
        return 'bg-purple-100 text-purple-600';
      case 'partner':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }
}
