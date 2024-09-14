import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';

export const userFeatureKey = 'user';

export interface State {

}

export const initialState: State = {

};

export const userReducer = createReducer(
  initialState,
);

