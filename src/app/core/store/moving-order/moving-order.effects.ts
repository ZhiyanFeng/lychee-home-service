import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, EMPTY, from, map, tap} from "rxjs";
import {MovingOrderActions} from "./moving-order.actions";
import {FirestoreService} from "../../services/firestore-service/firestore.service";
import {MovingOrder} from "../../../features/moving/models/moving-order";
import {Router} from "@angular/router";

@Injectable()
export class MovingOrderEffects {
  constructor(private actions$: Actions, private fireStoreService: FirestoreService, private router: Router) {}

  loadOrders$ = createEffect(() => this.actions$.pipe(
      ofType(MovingOrderActions.loadMovingOrders),
      concatMap((action) => from(this.fireStoreService.loadMovingOrders())
        .pipe(
          map((response) => MovingOrderActions.loadMovingOrdersSuccess({movingOrders: response})),
          catchError(() => EMPTY)
        ))
    )
  );

  saveOrder$ = createEffect(() => this.actions$.pipe(
      ofType(MovingOrderActions.saveMovingOrder),
      concatMap((action) => from(this.fireStoreService.save(action.movingOrder))
        .pipe(
          map((response) => ({action, response})),
          tap(() => {this.router.navigate(['thankyou'])}
          ),
          map(({action, response}) => MovingOrderActions.saveMovingOrderSuccess({movingOrder: action.movingOrder})),
          catchError(() => EMPTY)
        ))
    )
  );
}
