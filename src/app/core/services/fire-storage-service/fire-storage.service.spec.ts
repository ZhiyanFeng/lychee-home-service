import { TestBed } from '@angular/core/testing';

import { FireStorageService } from './fire-storage.service';

describe('MovingOrderService', () => {
  let service: FireStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
