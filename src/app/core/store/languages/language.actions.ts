import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {Dictionary} from "../../services/translate-service/translationSet";

export const languageActions = createActionGroup({
    source: 'Language',
    events: {
      'Set Language': props<({language: String})>()
    }
});
