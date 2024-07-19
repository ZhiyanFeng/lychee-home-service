import {
  AfterContentInit,
  AfterViewInit,
  Component, DoCheck,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from "@angular/material/stepper";
import {MatCardModule} from "@angular/material/card";
import {RouteDetail} from "../../models/route-detail";
import {PropertyDetail} from "../../models/property-detail";
import {BulkyItems} from "../../models/bulkyItems";
import {TranslateModule} from "@ngx-translate/core";
import {Property} from "../../models/property";
import {Trip} from "../../models/trip";
import {MovingOrderService} from "../../services/moving-order-service/moving-order.service";

@Component({
  selector: 'app-moving-service-summary',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatStepperModule, MatCardModule, TranslateModule],
  templateUrl: './moving-service-summary.component.html',
  styleUrls: ['./moving-service-summary.component.css']
})
export class MovingServiceSummaryComponent implements OnInit, OnChanges{
  @Input() propertyForm: FormGroup;
  @Input() bulkyItemsForm: FormGroup;
  @Input() isMobile: boolean;
  @Input() formUpdated: boolean;

  trip: Trip;
  property: Property;
  bulkyItems: BulkyItems;
  movingDate: Date;

  constructor(private movingDetailService: MovingOrderService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.property = this.propertyForm.value;
    this.bulkyItems = this.bulkyItemsForm.value;
    this.trip = this.movingDetailService.tripForm.value;
    this.movingDate = this.movingDetailService.dateForm.value.date;
    }
}
