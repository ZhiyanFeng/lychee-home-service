import {Component, inject, Input, OnInit} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {MovingOrder} from "../../../models/moving-order";
import {StepperOrientation} from "@angular/material/stepper";
import {AsyncPipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {ImagePopupComponent} from "../../../../../shared/component/image-popup/image-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {select, Store} from "@ngrx/store";
import {selectPayloadById} from "../../../../../core/store/payload/payload.selectors";
import {Observable} from "rxjs";
import {MovingOrderService} from "../../../services/moving-order-service/moving-order.service";

@Component({
  selector: 'app-small-moving-detail-table',
  standalone: true,
  imports: [
    TranslateModule,
    NgForOf,
    NgOptimizedImage,
    AsyncPipe
  ],
  templateUrl: './small-moving-detail-table.component.html',
  styleUrl: './small-moving-detail-table.component.css'
})
export class SmallMovingDetailTableComponent implements OnInit{
  @Input() orientation: StepperOrientation;

  readonly dialog = inject(MatDialog);
  order:MovingOrder;


  detail: string = "MOVING.STEP.DETAIL.LABEL";
  payload: string = "MOVING.STEP.PAYLOAD.LABEL";
  smallMoving:"MOVING.SERVICE.SMALL.TITLE";
  constructor(private store: Store, private movingOrderService: MovingOrderService) {
  }
  ngOnInit(): void {
    this.movingOrderService.order$.subscribe(order => {
      this.order = order;
    })

  }

  openImagePopup(imageUrl: string) {
    const data = { imageUrl: imageUrl };
    this.dialog.open(ImagePopupComponent, { data });
  }
}
