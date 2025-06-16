import { TestBed } from '@angular/core/testing';

import { TechnologyIconService } from './technology-icon.service';

describe('TechnologyIconService', () => {
  let service: TechnologyIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnologyIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
