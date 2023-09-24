import { createReducer, on } from '@ngrx/store';
import { languageActions} from "./language.actions";

export const languageFeatureKey = 'language';

export interface State {
}

export const initialState: State =
{};

export const languageReducer = createReducer(
  initialState, on(languageActions.loadLanguagesSuccess, (state, {languages}) => ({
    ...state,
    'en': JSON.parse(languages['en']['fields']['en']['stringValue']),
    'zh-en': JSON.parse(languages['zh-en']['fields']['zh-en']['stringValue'])
  }))
);

