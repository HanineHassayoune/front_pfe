import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-table-error-pagination',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './table-error-pagination.component.html',
  styleUrls: ['./table-error-pagination.component.css']
})
export class TableErrorPaginationComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() totalRows = 0;
  @Output() viewError = new EventEmitter<any>();

  displayedColumns: string[] = ['timestamp', 'level', 'message', 'stacktrace', 'action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.data);
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  onView(error: any) {
    this.viewError.emit(error);
  }
}
