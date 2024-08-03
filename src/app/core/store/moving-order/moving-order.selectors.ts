import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as orderReducer from './moving-order.reducer';


export const selectOrderState = createFeatureSelector(orderReducer.movingOrderFeatureKey);
export const selectAllOrders = createSelector(selectOrderState, orderReducer.adapter.getSelectors().selectAll);
