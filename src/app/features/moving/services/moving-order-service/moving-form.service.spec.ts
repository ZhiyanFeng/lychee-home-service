import { TestBed } from '@angular/core/testing';

import { MovingOrderService } from './moving-order.service';

describe('MovingFormService', () => {
  let service: MovingOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovingOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
