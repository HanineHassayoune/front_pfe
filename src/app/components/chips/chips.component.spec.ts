import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsComponent } from './chips.component';

describe('ChipsComponent', () => {
  let component: ChipsComponent<string>;
  let fixture: ComponentFixture<ChipsComponent<string>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChipsComponent<string>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
