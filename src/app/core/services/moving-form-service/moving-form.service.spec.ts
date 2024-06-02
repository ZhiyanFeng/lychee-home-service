import { TestBed } from '@angular/core/testing';

import { MovingFormService } from './moving-form.service';

describe('MovingFormService', () => {
  let service: MovingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovingFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
