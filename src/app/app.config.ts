import {ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideHttpClient} from "@angular/common/http";
import {TranslateService} from "./core/services/translate-service/translate.service";
import { provideStore } from '@ngrx/store';
import {languageReducer} from "./core/store/languages/language.reducer";
import {httpInterceptorProviders} from "./core/interceptors";
import {servicesProvider} from "./core/services";
import {provideEffects} from "@ngrx/effects";
import {languageActions} from "./core/store/languages/language.actions";
import {LanguageEffects} from "./core/store/languages/language.effects";
import {provideStoreDevtools} from "@ngrx/store-devtools";

export const appConfig: ApplicationConfig = {
  providers: [servicesProvider, provideRouter(routes), provideAnimations(), provideAnimations(), provideEffects([LanguageEffects]),
    provideHttpClient(), provideStore({language: languageReducer}), httpInterceptorProviders,
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    })]
};
