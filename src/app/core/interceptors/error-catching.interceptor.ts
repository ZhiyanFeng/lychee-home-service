import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(
        (err: HttpErrorResponse) => {
          let errorMsg = ''
          if(err.error instanceof ErrorEvent){
            console.log('This is client side error');
            errorMsg = `error: ${err.error.message};`
          }else{
            console.log('This is server ise error');
            errorMsg = `Error Code: ${err.status}, Message: ${err.error.message};`
          }
          console.log(errorMsg);
          return throwError(() => errorMsg);
        }
      )
    );
  }
}
