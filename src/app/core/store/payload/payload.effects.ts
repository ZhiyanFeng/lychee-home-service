import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, EMPTY, exhaustMap, from, map, mergeMap, of, switchMap, tap} from "rxjs";
import {FireStorageService} from "../../services/fire-storage-service/fire-storage.service";
import {Store} from "@ngrx/store";
import {PayloadActions} from "./payload.actions";

@Injectable()
export class PayloadEffects {
  constructor(private actions$: Actions, private movingOrderService: FireStorageService, private store: Store) {
  }

uploadFile$ = createEffect(() => this.actions$.pipe(
    ofType(PayloadActions.uploadPayload),
    concatMap((action) => from(this.movingOrderService.uploadFile(action.phone, action.file))
      .pipe(
        map(url => PayloadActions.uploadPayloadSuccess({id: action.phone, url: url})),
        catchError(() => EMPTY)
      ))
  )
);
}





