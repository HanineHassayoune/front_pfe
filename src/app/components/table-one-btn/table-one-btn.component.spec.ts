import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOneBtnComponent } from './table-one-btn.component';

describe('TableOneBtnComponent', () => {
  let component: TableOneBtnComponent;
  let fixture: ComponentFixture<TableOneBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableOneBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableOneBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
