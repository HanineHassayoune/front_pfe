import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSolutionDialogComponent } from './add-solution-dialog.component';

describe('AddSolutionDialogComponent', () => {
  let component: AddSolutionDialogComponent;
  let fixture: ComponentFixture<AddSolutionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSolutionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSolutionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
