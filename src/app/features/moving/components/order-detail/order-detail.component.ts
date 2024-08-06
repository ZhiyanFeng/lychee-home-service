import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule, StepperOrientation} from "@angular/material/stepper";
import {MatCardModule} from "@angular/material/card";
import {BulkyItems} from "../../models/bulkyItems";
import {TranslateModule} from "@ngx-translate/core";
import {Property} from "../../models/property";
import {Trip} from "../../models/trip";
import {MovingOrderService} from "../../services/moving-order-service/moving-order.service";
import {
  ResidentialMovingDetailTableComponent
} from "./residential-moving-detail-table/residential-moving-detail-table.component";
import {SmallMovingDetailTableComponent} from "./small-moving-detail-table/small-moving-detail-table.component";
import {MovingType} from "../../enums/moving-type";
import {MovingOrder} from "../../models/moving-order";
import {ResponsiveDesignService} from "../../../../core/services/responsive-design/responsive-design.service";
import {SCREEN_SIZE} from "../../../../shared/enums/screen-size";

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatStepperModule, MatCardModule, TranslateModule, ResidentialMovingDetailTableComponent, SmallMovingDetailTableComponent],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnChanges{
  @Input() isMobile: boolean;
  @Input() formUpdated: boolean;
  @Input() movingType: MovingType;

  order: MovingOrder;
  orientation: StepperOrientation = 'vertical';

  trip: Trip;
  property: Property;
  bulkyItems: BulkyItems;
  movingDate: Date;

  constructor(private movingDetailService: MovingOrderService, private rwd: ResponsiveDesignService) {
    this.rwd.onResize$.subscribe(size => {
      if(size === SCREEN_SIZE.XS){
        this.orientation = 'vertical';
      }else{
        this.orientation = 'horizontal';
      }
    });

  }

  ngOnInit(): void {
    this.order = this.movingDetailService.movingOrder;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.order = this.movingDetailService.movingOrder;
    this.property = this.order.property;
    this.bulkyItems = this.order.bulkyItems;
    this.trip = this.order.trip;
    this.movingDate = this.order.movingDate;
    }

  protected readonly MovingType = MovingType;
}
