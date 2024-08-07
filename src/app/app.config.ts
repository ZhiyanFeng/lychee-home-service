import {ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {provideStore} from '@ngrx/store';
import {httpInterceptorProviders} from "./core/interceptors";
import {servicesProvider} from "./core/services";
import {provideEffects} from "@ngrx/effects";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {environment} from "../environments/environment";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {PayloadEffects} from "./core/store/payload/payload.effects";
import {payloadFeatureKey, payloadReducer} from "./core/store/payload/payload.reducer";
import {imageReducer} from "./core/store/images/image.reducer";
import {ImageEffects} from "./core/store/images/image.effects";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {MovingOrderEffects} from "./core/store/moving-order/moving-order.effects";
import {MovingOrderReducer} from "./core/store/moving-order/moving-order.reducer";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [servicesProvider, provideRouter(routes), provideAnimations(), provideAnimations(), provideHttpClient(),
    provideStore({payload: payloadReducer, image: imageReducer, movingOrder: MovingOrderReducer}),
    provideEffects([PayloadEffects, ImageEffects, MovingOrderEffects]), httpInterceptorProviders,
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    {provide: FIREBASE_OPTIONS, useValue: environment.firebase},
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true
    })]
};
