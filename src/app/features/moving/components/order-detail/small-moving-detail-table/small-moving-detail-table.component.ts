import {Component, Input} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {MovingOrder} from "../../../models/moving-order";
import {StepperOrientation} from "@angular/material/stepper";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-small-moving-detail-table',
  standalone: true,
  imports: [
    TranslateModule,
    NgForOf
  ],
  templateUrl: './small-moving-detail-table.component.html',
  styleUrl: './small-moving-detail-table.component.css'
})
export class SmallMovingDetailTableComponent {
  @Input() order: MovingOrder;
  @Input() orientation: StepperOrientation;

  detail: string = "MOVING.STEP.DETAIL.LABEL";
  payload: string = "MOVING.STEP.PAYLOAD.LABEL";
  smallMoving:"MOVING.SERVICE.SMALL.TITLE";


  constructor() {
  }

}
