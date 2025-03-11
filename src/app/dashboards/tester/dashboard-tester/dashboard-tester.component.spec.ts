import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTesterComponent } from './dashboard-tester.component';

describe('DashboardTesterComponent', () => {
  let component: DashboardTesterComponent;
  let fixture: ComponentFixture<DashboardTesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTesterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
