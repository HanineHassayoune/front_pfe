import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsProjectComponent } from './tickets-project.component';

describe('TicketsProjectComponent', () => {
  let component: TicketsProjectComponent;
  let fixture: ComponentFixture<TicketsProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketsProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
