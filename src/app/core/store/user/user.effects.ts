import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {FireStorageService} from "../../services/fire-storage-service/fire-storage.service";
import {Store} from "@ngrx/store";
import {UserService} from "../../services/user-service/user.service";
import {PayloadActions} from "../payload/payload.actions";
import {catchError, concatMap, EMPTY, from, map} from "rxjs";
import {UserActions} from "./user.actions";



@Injectable()
export class UserEffects {


  constructor(private actions$: Actions, private userOrderService: UserService, private store: Store) {
  }

  saveUser$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.saveUser),
      concatMap((action) => from(this.userOrderService.saveUser(action.user))
        .pipe(
          map(url => UserActions.saveUserSuccess()),
          catchError(() => EMPTY)
        ))
    )
  );

}
