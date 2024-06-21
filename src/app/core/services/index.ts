import { TranslateService} from "./translate-service/translate.service";
import {RestApiService} from "./rest-api-service/rest-api.service";
import {AuthService} from "./auth-service/auth.service";
import {MovingOrderService} from "../../features/moving/services/moving-order-service/moving-order.service";

/** Http interceptor providers in outside-in order */
export const servicesProvider = [
  { provide: TranslateService},
  { provide: RestApiService},
  { provide: AuthService},
  { provide: MovingOrderService}
];
