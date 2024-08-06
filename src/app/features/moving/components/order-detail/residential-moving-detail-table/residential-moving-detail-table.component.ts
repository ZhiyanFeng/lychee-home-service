import {Component, Input} from '@angular/core';
import {MovingOrder} from "../../../models/moving-order";
import {TranslateModule} from "@ngx-translate/core";
import {StepperOrientation} from "@angular/material/stepper";

@Component({
  selector: 'app-residential-moving-detail-table',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './residential-moving-detail-table.component.html',
  styleUrl: './residential-moving-detail-table.component.css'
})
export class ResidentialMovingDetailTableComponent {
  @Input() order: MovingOrder;
  @Input() isMobile: boolean;
  @Input() orientation: StepperOrientation;

  propertyType: string = "MOVING.STEP.PROPERTY.LABEL";
  room: string = "MOVING.ROOM.LABEL";
  piano: string = "MOVING.PIANO.LABEL";
  marble: string = "MOVING.MARBLE.LABEL";
  refrigerator: string = "MOVING.REFRIGERATOR.LABEL";
  detail: string = "MOVING.STEP.DETAIL.LABEL";

  constructor() {
  }

}
