import {Injectable} from '@angular/core';
import {SCREEN_SIZE} from "../../../shared/enums/screen-size";
import {distinctUntilChanged, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResponsiveDesignService {

  private resizeSubject: Subject<SCREEN_SIZE>;
  defaultSize = SCREEN_SIZE.SM;
  constructor() {
    this.resizeSubject = new Subject();
  }
  onResize(size: SCREEN_SIZE) {
    this.resizeSubject.next(size);
  }

  setSize(size: SCREEN_SIZE) {
    this.defaultSize = size;
  }

  get onResize$(): Observable<SCREEN_SIZE> {
    return this.resizeSubject.asObservable().pipe(distinctUntilChanged());
  }
}
