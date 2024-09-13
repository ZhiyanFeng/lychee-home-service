import {AuthService} from "./auth-service/auth.service";
import {FireStorageService} from "./fire-storage-service/fire-storage.service";
import {FirestoreService} from "./firestore-service/firestore.service";

/** Http interceptor providers in outside-in order */
export const servicesProvider = [
  { provide: AuthService},
  { provide: FireStorageService},
  { provide: FirestoreService}
];
