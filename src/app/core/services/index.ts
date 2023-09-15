import { TranslateService} from "./translate-service/translate.service";
import {RestApiService} from "./rest-api-service/rest-api.service";

/** Http interceptor providers in outside-in order */
export const servicesProvider = [
  { provide: TranslateService},
  { provide: RestApiService}
];
