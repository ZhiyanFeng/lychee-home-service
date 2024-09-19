import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {MovingOrder} from "../../../features/moving/models/moving-order";
import {User} from "../../../shared/models/user";
import {MovingOrderActions} from "../moving-order/moving-order.actions";

export const userFeatureKey = 'user';
export interface State extends EntityState<User>{
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  ids:[],
  entities: {}
});

export const userReducer = createReducer(
  initialState,
  on (UserActions.getUserSuccess, (state, {user}) =>
    {
      state = adapter.addOne(user, state);
      debugger;
      return state;
    }
  )
);

