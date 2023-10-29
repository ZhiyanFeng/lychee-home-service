import { createReducer, on } from '@ngrx/store';
import { languageActions} from "./language.actions";

export const languageFeatureKey = 'language';

export interface State {
}

export const initialState: State =
{};

export const languageReducer = createReducer(
  initialState, on(languageActions.setLanguage, (state, {language}) => ({
    ...state,  "language": language
  }))
);

