import { createFeatureSelector, createSelector } from '@ngrx/store';
import {Features} from "../enums/features";
import {Payload} from "../../../features/moving/models/payload";
import {adapter, payloadFeatureKey, payloadReducer} from "./payload.reducer";
import * as PayloadReducer from './payload.reducer';
import {EntityState} from "@ngrx/entity";
import {Payloads} from "../../../features/moving/models/payloads";
export const selectAllPayloadEntities = createFeatureSelector(payloadFeatureKey);

export const selectPayloadById = (props: {id: string}) => createSelector(
  selectAllPayloadEntities, (payloads: EntityState<any>)=>{
    return payloads.entities[props.id]['payloadURLs'];
  }
);
