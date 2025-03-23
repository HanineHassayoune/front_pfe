import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() type: 'success' | 'danger' | 'warning' | 'info' | 'dark' = 'info';
  @Input() message: string = '';
  @Input() isVisible: boolean = false;

  getAlertClass() {
    switch (this.type) {
      case 'success':
        return 'text-green-800 border-green-300 bg-green-50';
      case 'danger':
        return 'text-red-800 border-red-300 bg-red-50'; 
      case 'warning':
        return 'text-yellow-800 border-yellow-300 bg-yellow-50';
      case 'info':
        return 'text-blue-800 border-blue-300 bg-blue-50';
      case 'dark':
        return 'text-gray-800 border-gray-300 bg-gray-50';
      default:
        return '';
    }
  }

}
