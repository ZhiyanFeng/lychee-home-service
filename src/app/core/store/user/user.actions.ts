import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {User} from "../../../shared/models/user";

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Save User': props<{user: User}>(),
    'Save User Success': emptyProps(),
    'Save User Failure': props<{ error: unknown }>(),
  }
});
