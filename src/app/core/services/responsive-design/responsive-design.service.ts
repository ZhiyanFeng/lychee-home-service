import {HostListener, Injectable} from '@angular/core';
import {StepperOrientation} from "@angular/material/stepper";
import {Event} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ResponsiveDesignService {
  private _isMobile=false;

  public formUpdated = false;
  orientation: StepperOrientation = 'vertical';
  constructor() {
    let screenWidth = window.innerWidth;
    if(screenWidth>430){//use iphone 15 pro max as the breakpoint
      this.orientation = 'horizontal';
    }else{
      this.orientation = 'vertical';
    }
  }
  // @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    let screenWidth = window.innerWidth;
    if(screenWidth>443){
      this.orientation = 'horizontal';
      this._isMobile = false;
    }else{
      this.orientation = 'vertical';
      this._isMobile = true;
    }
  }

  get isMobile(): boolean {
    return this._isMobile;
  }

  set isMobile(value: boolean) {
    this._isMobile = value;
  }

}
