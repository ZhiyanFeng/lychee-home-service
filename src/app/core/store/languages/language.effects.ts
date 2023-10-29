import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { languageActions} from "./language.actions";
import {RestApiService} from "../../services/rest-api-service/rest-api.service";
import {catchError, exhaustMap, map, of} from "rxjs";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class LanguageEffects {
  constructor(private actions$: Actions, private restApiService: RestApiService ) {}

  // getLanguages = createEffect(() => this.actions$.pipe(
  //     ofType(languageActions.loadLanguages), exhaustMap(
  //         () => {
  //           return this.restApiService.getLanguages().pipe(
  //             map((languages) => languageActions.loadLanguagesSuccess({languages})),
  //               catchError(
  //                 (error) => of(languageActions.loadLanguagesFailure({error}))
  //               )
  //           )
  //         }
  //     )
  //   )
  //
  // )
}
