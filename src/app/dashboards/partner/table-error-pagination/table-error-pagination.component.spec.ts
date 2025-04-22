import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableErrorPaginationComponent } from './table-error-pagination.component';

describe('TableErrorPaginationComponent', () => {
  let component: TableErrorPaginationComponent;
  let fixture: ComponentFixture<TableErrorPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableErrorPaginationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableErrorPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
