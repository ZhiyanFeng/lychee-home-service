import { createReducer, on } from '@ngrx/store';
import { ImageActions} from './image.actions';

export const imageFeatureKey = 'image';

export interface State {
  imageURLs: {};
}

export const initialState: State = {
  imageURLs: {}
};

export const imageReducer = createReducer(
  initialState,
  on(ImageActions.loadImagesSuccess, (state, {images}) => {
    return { ...state, imageURLs: images };
  })
);

