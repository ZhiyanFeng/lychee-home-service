import { TestBed } from '@angular/core/testing';

import { LanguageResolverService } from './language-resolver.service';

describe('LanguageResolverService', () => {
  let service: LanguageResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
