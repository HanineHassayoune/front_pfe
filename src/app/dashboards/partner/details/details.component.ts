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
  @Input() tasks: string[] = [
    'Fix alignment issue',
    'Update user permissions',
    'Deploy to staging'
  ];
  @Input() imageUrl: string = 'https://media.istockphoto.com/id/1303877287/vector/paper-checklist-and-pencil-flat-pictogram.jpg?s=612x612&w=0&k=20&c=NoqPzn94VH2Pm7epxF8P5rCcScMEAiGQ8Hv_b2ZwRjY=';
  @Input() category: string = 'Bug';
}
