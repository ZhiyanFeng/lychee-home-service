import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PayloadEffects } from './payload.effects';

describe('FileApiEffects', () => {
  let actions$: Observable<any>;
  let effects: PayloadEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PayloadEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(PayloadEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
