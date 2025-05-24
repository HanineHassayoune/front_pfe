import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroserviceDetailsComponent } from './microservice-details.component';

describe('MicroserviceDetailsComponent', () => {
  let component: MicroserviceDetailsComponent;
  let fixture: ComponentFixture<MicroserviceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MicroserviceDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MicroserviceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
