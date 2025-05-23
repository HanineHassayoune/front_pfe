import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCarouselComponent } from './ticket-carousel.component';

describe('TicketCarouselComponent', () => {
  let component: TicketCarouselComponent;
  let fixture: ComponentFixture<TicketCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
