import {HostListener, Injectable} from '@angular/core';
import {StepperOrientation} from "@angular/material/stepper";
import {Event} from "@angular/router";
import {SCREEN_SIZE} from "../../../shared/enums/screen-size";
import {distinctUntilChanged, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResponsiveDesignService {

  private resizeSubject: Subject<SCREEN_SIZE>;
  constructor() {
    this.resizeSubject = new Subject();
  }
  onResize(size: SCREEN_SIZE) {
    this.resizeSubject.next(size);
  }
  get onResize$(): Observable<SCREEN_SIZE> {
    return this.resizeSubject.asObservable().pipe(distinctUntilChanged());
  }
}
