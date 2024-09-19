import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {User} from "../../../shared/models/user";

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Save User': props<{user: User}>(),
    'Save User Success': emptyProps(),
    'Save User Failure': props<{ error: unknown }>(),
    'Get User': props<{id: string}>(),
    'Get User Success': props<{user: User}>(),
    'Get User Failure': props<{ error: unknown }>(),
  }
});
