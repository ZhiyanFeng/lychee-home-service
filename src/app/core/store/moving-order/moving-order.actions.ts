import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {MovingOrder} from "../../../features/moving/models/moving-order";
import {MovingType} from "../../../features/moving/enums/moving-type";

export const MovingOrderActions = createActionGroup({
  source: 'Moving Page',
  events: {
    'Load MovingOrders': emptyProps(),
    'Load MovingOrders Success': props<{ movingOrders: MovingOrder[] }>(),
    'Load MovingOrders Failure': props<{ error: unknown }>(),
    'Save MovingOrder': props<{ movingOrder: MovingOrder}>(),
    'Save MovingOrder Success': props<{movingOrder: MovingOrder}>(),
    'Save MovingOrder Failure': props<{ error: unknown }>(),
  }
});
