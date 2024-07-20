import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ImageActions = createActionGroup({
  source: 'Home Page',
  events: {
    'Load Images': emptyProps(),
    'Load Images Success': props<{ data: unknown }>(),
    'Load Images Failure': props<{ error: unknown }>(),
  }
});
