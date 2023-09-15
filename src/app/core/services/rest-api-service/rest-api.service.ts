import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private httpClient: HttpClient) { }

  getLanguages(): Observable<any> {
    let result = this.httpClient.get(environment.fireStoreApi + "languages/en");
    return result;
  }

}
