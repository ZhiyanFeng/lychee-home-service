import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LanguageEffects } from './language.effects';

describe('LanguageEffects', () => {
  let actions$: Observable<any>;
  let effects: LanguageEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LanguageEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(LanguageEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
