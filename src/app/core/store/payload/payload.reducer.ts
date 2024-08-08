import { createReducer, on } from '@ngrx/store';
import { PayloadActions } from './payload.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Payload} from "../../../features/moving/models/payload";

export const payloadFeatureKey = 'payload';

export interface State extends EntityState<Payload>{
}

export const adapter: EntityAdapter<Payload> = createEntityAdapter<Payload>();
export const initialState: State = adapter.getInitialState({
});

export const payloadReducer = createReducer(
  initialState,
  on (PayloadActions.uploadPayloadSuccess, (state, {id,url}) =>
    {
      if(!state.entities[id]){
        let newPayload = {
          id: id,
          payloadURLs: [url]
        } as Payload;
        state = adapter.addOne(newPayload, state);
        return state;
      }

      let payload = state.entities[id];
      if(!payload.payloadURLs.includes(url)){
        payload = {...payload, payloadURLs: [...payload.payloadURLs, url]};
        state =  adapter.updateOne({
          id: id,
          changes: payload
        }, state);
      }
      return state;
    }
  )
);

