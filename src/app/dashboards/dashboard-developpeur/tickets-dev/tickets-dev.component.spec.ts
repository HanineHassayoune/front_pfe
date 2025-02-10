import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsDevComponent } from './tickets-dev.component';

describe('TicketsDevComponent', () => {
  let component: TicketsDevComponent;
  let fixture: ComponentFixture<TicketsDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsDevComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketsDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
