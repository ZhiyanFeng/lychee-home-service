import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {catchError, forkJoin, map, Observable, retry} from "rxjs";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  constructor(private httpClient: HttpClient) { }

  getLanguages(): Observable<any> {
    const getEnglishApi = this.httpClient.get(environment.fireStoreApi + "languages/en");
    const getChinessSimplifiedApi = this.httpClient.get(environment.fireStoreApi + "languages/zh-en");
    return forkJoin([getEnglishApi, getChinessSimplifiedApi]).pipe(
      map(results => {
        let language={};
        language['en'] = results[0];
        language['zh-en'] = results[1];
        return language;
      }),
    )
  }
}
