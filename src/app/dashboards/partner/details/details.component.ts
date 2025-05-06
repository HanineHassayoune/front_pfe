import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  @Input() status: string = 'In Progress';
  @Input() priority: string = 'High';
  @Input() tasks: string[] = [];
  @Input() imageUrl: string = '';
  @Input() category: string = 'Bug';

  @Input() description: string = '';
  @Input() date: string = ''; 
  @Input() level: string = ''; 
  @Input() loggerName: string = ''; 
}
