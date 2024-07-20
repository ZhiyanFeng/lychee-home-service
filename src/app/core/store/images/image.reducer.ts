import { createReducer, on } from '@ngrx/store';
import { ImageActions } from './image.actions';

export const imageFeatureKey = 'image';

export interface State {

}

export const initialState: State = {

};

export const imageReducer = createReducer(
  initialState,
  on(ImageActions.loadImagesSuccess, (state, { data }) => {
    return { ...state, data };
  })
);

