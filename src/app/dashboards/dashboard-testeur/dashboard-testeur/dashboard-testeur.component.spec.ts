import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTesteurComponent } from './dashboard-testeur.component';

describe('DashboardTesteurComponent', () => {
  let component: DashboardTesteurComponent;
  let fixture: ComponentFixture<DashboardTesteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTesteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardTesteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
