import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {FireStorageService} from "../../services/fire-storage-service/fire-storage.service";
import {catchError, EMPTY, from, map, switchMap} from "rxjs";
import {ImageActions} from "./image.actions";

@Injectable()
export class ImageEffects {

  constructor(private actions$: Actions, private fireStorageService: FireStorageService) {
  }

  loadImages$ = createEffect(() => this.actions$.pipe(
      ofType(ImageActions.loadImages),
      switchMap(() => from(this.fireStorageService.loadFiles('images/'))
        .pipe(
          map(urls => ImageActions.loadImagesSuccess({images: urls})),
          catchError(() => EMPTY)
        ))
    )
  );
}
