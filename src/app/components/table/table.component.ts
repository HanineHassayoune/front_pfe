import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() title: string = '';
  @Input() columns: { field: string, header: string }[] = [];
  @Input() data: any[] = [];
  @Input() actionButtonText: string = ''; 

}
