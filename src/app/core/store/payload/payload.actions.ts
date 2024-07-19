import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {Payload} from "../../../features/moving/models/payload";

export const PayloadActions = createActionGroup({
  source: 'Payload Api',
  events: {
    'Load Payloads': emptyProps(),
    'Initiate Payload': props<{ payload: Payload }>(),
    'Load Payload Success': props<{ data: unknown }>(),
    'Load Payload Failure': props<{ error: unknown }>(),
    'upload Payload':  props<{ phone: string, file: File}>(),
    'Upload Payload Success': props<{id: string, url: string}>(),
    'Upload Payload Failure': props<{ error: any }>(),
  }
});

