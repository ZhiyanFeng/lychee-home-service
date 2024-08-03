import { createReducer, on } from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {MovingOrder} from "../../../features/moving/models/moving-order";
import {MovingOrderActions} from "./moving-order.actions";

export const movingOrderFeatureKey = 'movingOrder';
export interface State extends EntityState<MovingOrder>{

}

export const adapter: EntityAdapter<MovingOrder> = createEntityAdapter<MovingOrder>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  ids:[],
  entities: {}
});

export const MovingOrderReducer = createReducer(
  initialState,
  on(MovingOrderActions.loadMovingOrdersSuccess, (state, {movingOrders}) =>{
      return adapter.setAll(movingOrders, state);
  }),
  on (MovingOrderActions.saveMovingOrderSuccess, (state, {movingOrder}) =>
    {
      state = adapter.addOne(movingOrder, state);
      return state;
    }
  )
);

