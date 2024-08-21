import {SCREEN_SIZE} from "../app/shared/enums/screen-size";
import {StepperOrientation} from "@angular/material/stepper";

export function setOrientation(size: SCREEN_SIZE){
  let orientation: StepperOrientation;
  if(size === SCREEN_SIZE.XS){
    orientation = 'vertical';
  }else{
    orientation = 'horizontal';
  }
  return orientation;
}
