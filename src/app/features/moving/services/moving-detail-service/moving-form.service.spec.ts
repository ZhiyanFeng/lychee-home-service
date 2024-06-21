import { TestBed } from '@angular/core/testing';

import { MovingDetailService } from './moving-detail.service';

describe('MovingFormService', () => {
  let service: MovingDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovingDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
