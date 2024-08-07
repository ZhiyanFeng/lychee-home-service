import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ImageActions = createActionGroup({
  source: 'Home Page',
  events: {
    'Load Images': emptyProps(),
    'Load Images Success': props<{ images: {} }>(),
    'Load Images Failure': props<{ error: unknown }>(),
  }
});
