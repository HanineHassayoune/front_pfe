import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPartnerComponent } from './dashboard-partner.component';

describe('DashboardPartnerComponent', () => {
  let component: DashboardPartnerComponent;
  let fixture: ComponentFixture<DashboardPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPartnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
