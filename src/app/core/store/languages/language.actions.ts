import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {Dictionary} from "../../services/translate-service/translationSet";

export const languageActions = createActionGroup({
    source: 'Language',
    events: {
      'Load Languages': emptyProps(),
      'Load Languages Success': props<{ languages:  {}}>(),
      'Load Languages Failure': props<{ error: unknown }>(),
    }
});
