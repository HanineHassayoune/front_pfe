import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRegisterComponent } from './pending-register.component';

describe('PendingRegisterComponent', () => {
  let component: PendingRegisterComponent;
  let fixture: ComponentFixture<PendingRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendingRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
