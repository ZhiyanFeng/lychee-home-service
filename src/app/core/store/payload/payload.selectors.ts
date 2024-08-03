import { createFeatureSelector, createSelector } from '@ngrx/store';
import {payloadFeatureKey} from "./payload.reducer";
import {EntityState} from "@ngrx/entity";
export const selectAllPayloadEntities = createFeatureSelector(payloadFeatureKey);

export const selectPayloadById = (props: {id: string}) => createSelector(
  selectAllPayloadEntities, (payloads: EntityState<any>)=>{
    if(payloads.entities[props.id]){
      return payloads.entities[props.id]['payloadURLs'];
    }
  }
);
