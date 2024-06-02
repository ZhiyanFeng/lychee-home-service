import {HostListener, Injectable} from '@angular/core';
import {StepperOrientation} from "@angular/material/stepper";
import {Event} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ResponsiveDesignService {

  public isMobile=false;
  public formUpdated = false;
  orientation: StepperOrientation = 'vertical';
  constructor() {
    let screenWidth = window.innerWidth;
    if(screenWidth>390){
      this.orientation = 'horizontal';
    }else{
      this.orientation = 'vertical';
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    let screenWidth = window.innerWidth;
    if(screenWidth>390){
      this.orientation = 'horizontal';
      this.isMobile = false;
    }else{
      this.orientation = 'vertical';
      this.isMobile = true;
    }
  }

}
