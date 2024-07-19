import { TranslateService} from "./translate-service/translate.service";
import {RestApiService} from "./rest-api-service/rest-api.service";
import {AuthService} from "./auth-service/auth.service";
import {FireStorageService} from "./fire-storage-service/fire-storage.service";
import {FirestoreService} from "./firestore-service/firestore.service";

/** Http interceptor providers in outside-in order */
export const servicesProvider = [
  { provide: TranslateService},
  { provide: RestApiService},
  { provide: AuthService},
  { provide: FireStorageService},
  { provide: FirestoreService}
];
