import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableErrorPaginationComponent } from '../table-error-pagination/table-error-pagination.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-errors',
  standalone: true,
  imports: [CommonModule, TableErrorPaginationComponent],
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  projectId: string | null = null;

ngOnInit() {
  this.projectId = this.route.snapshot.paramMap.get('id');
  console.log('projectId:', this.projectId);
}

  errorList = [
    {
      id: 1,
      timestamp: '2025-04-22T10:15:30',
      level: 'error',
      message: 'Unexpected token',
      stacktrace: 'at Parser.parse (parser.js:45:13)'
    },
    {
      id: 2,
      timestamp: '2025-04-21T14:50:00',
      level: 'error',
      message: 'Null pointer exception',
      stacktrace: 'at Service.process (service.js:30:8)'
    }
  ];

  total = this.errorList.length;

  onViewError(error: any) {
    this.router.navigate(
      [`/partner/projects/${this.projectId}/error-details`, error.id],
      { state: { error } }
    );
  }
  
  
}
