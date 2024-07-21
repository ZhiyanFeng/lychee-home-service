import {createFeatureSelector, createSelector} from '@ngrx/store';
import {imageFeatureKey, State} from "./image.reducer";


export const imageFeature = createFeatureSelector(imageFeatureKey);

export const selectAllImages = createSelector(
  imageFeature,
  (images: State) => images.imageURLs
);

export const selectImage = (name: string) => createSelector(
  imageFeature,
  (images: State) => images.imageURLs[name]
);





