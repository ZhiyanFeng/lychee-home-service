import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MovingOrderEffects } from './moving-order.effects';

describe('MovingOrderEffects', () => {
  let actions$: Observable<any>;
  let effects: MovingOrderEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovingOrderEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(MovingOrderEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
