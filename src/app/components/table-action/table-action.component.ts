import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-table-action',
  standalone: true,
  imports: [NgFor, NgIf,NgClass],
  templateUrl: './table-action.component.html',
  styleUrl: './table-action.component.css'
})
export class TableActionComponent {
  @Input() title: string = '';
  @Input() columns: { field: string, header: string }[] = [];
  @Input() data: any[] = [];

  @Output() actionClicked = new EventEmitter<{ id: number; action: string }>();

 /*  onToggle(row: any) {
    const action = row.enabled ? 'block' : 'approve';
    this.actionClicked.emit({ id: row.id, action });
  } */
    onToggle(row: any) {
      const action = row.enabled ? 'block' : 'approve';
      console.log('DEBUG | Row cliquée :', row); // 🧠 Pour voir la ligne exacte
      this.actionClicked.emit({ id: row.id, action });
    }
    
}
