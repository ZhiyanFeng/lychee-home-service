import { Injectable } from '@angular/core';
import {act, Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, EMPTY, exhaustMap, from, map, mergeMap, of, switchMap, tap} from "rxjs";
import {MovingOrderService} from "../../../features/moving/services/moving-order-service/moving-order.service";
import {Store} from "@ngrx/store";
import {getDownloadURL} from "@angular/fire/storage";
import firebase from "firebase/compat";
import {PayloadActions} from "./payload.actions";
import {Payload} from "../../../features/moving/models/payload";

@Injectable()
export class PayloadEffects {
  paylaad: Payload
  constructor(private actions$: Actions, private movingOrderService: MovingOrderService, private store: Store) {}

  uploadFile$ = createEffect(() => this.actions$.pipe(
      ofType(PayloadActions.uploadPayload),
      switchMap((action) => this.movingOrderService.uploadSingleFile(action.phone, action.file)
        .then((url) => {
          this.store.dispatch(PayloadActions.uploadPayloadSuccess({id: action.phone, url: url}));
        })
        .catch((error) => {console.error("File upload failed:", error); return error})
      )
    )
  );



}




