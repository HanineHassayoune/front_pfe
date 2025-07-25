import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RoleBadgeComponent } from '../role-badge/role-badge.component';

@Component({
  selector: 'app-table-pagination',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule,RoleBadgeComponent ],
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.css']
})
export class TablePaginationComponent {
  @Input() columns: { field: string; header: string }[] = [];
  @Input() data: any[] = [];
  @Input() totalRows = 0;
  @Input() userRole: string = '';

  @Output() pageChanged = new EventEmitter<any>();

  @Output() actionTriggered = new EventEmitter<{ id: number; action: string; user?: any }>();

  // Reçois l'objet complet (pas juste id)
   triggerAction(user: any, action: string) {
    this.actionTriggered.emit({ id: user.id, action, user });
  } 
  
  displayedColumns: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.displayedColumns = this.columns.map(c => c.field);
  }

  onPageChange(event: any) {
    this.pageChanged.emit(event);
  }

  triggerrAction(id: number, action: string) {
    this.actionTriggered.emit({ id, action });
  }  
}