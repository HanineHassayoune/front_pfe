import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KinbanComponent } from './kinban.component';

describe('KinbanComponent', () => {
  let component: KinbanComponent;
  let fixture: ComponentFixture<KinbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KinbanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KinbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
