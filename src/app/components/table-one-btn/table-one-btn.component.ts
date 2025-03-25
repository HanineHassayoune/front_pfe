import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-one-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-one-btn.component.html',
  styleUrl: './table-one-btn.component.css'
})
export class TableOneBtnComponent {
  @Input() title: string = '';
  @Input() columns: { field: string, header: string }[] = [];
  @Input() data: any[] = [];
  @Input() actionButtonText: string = ''; 
 

}
