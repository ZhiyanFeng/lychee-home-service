import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {FireStorageService} from "../../services/fire-storage-service/fire-storage.service";
import {Store} from "@ngrx/store";
import {UserService} from "../../services/user-service/user.service";
import {PayloadActions} from "../payload/payload.actions";
import {catchError, concatMap, EMPTY, from, map, tap} from "rxjs";
import {UserActions} from "./user.actions";
import {Router} from "@angular/router";



@Injectable()
export class UserEffects {


  constructor(private actions$: Actions, private userService: UserService, private store: Store, private router: Router) {
  }

  saveUser$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.saveUser),
      concatMap((action) => from(this.userService.saveUser(action.user))
        .pipe(
          map(url => UserActions.getUser({id: action.user.id})),
          catchError(() => EMPTY)
        ))
    )
  );

  getUser$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.getUser),
      concatMap((action) => from(this.userService.getUser(action.id))
        .pipe(
          map(user => UserActions.getUserSuccess({user: user})),
          tap(user => this.router.navigate(['/'])),
          catchError(() => EMPTY)
        ))
    )
  );


}
