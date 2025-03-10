import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSystemeComponent } from './dashboard-systeme.component';

describe('DashboardSystemeComponent', () => {
  let component: DashboardSystemeComponent;
  let fixture: ComponentFixture<DashboardSystemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSystemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardSystemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
