import { TestBed } from '@angular/core/testing';

import { ResponsiveDesignService } from './responsive-design.service';

describe('ResponsiveDesignService', () => {
  let service: ResponsiveDesignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsiveDesignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
