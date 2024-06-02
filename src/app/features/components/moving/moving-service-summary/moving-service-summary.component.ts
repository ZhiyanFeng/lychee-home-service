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
import {RouteDetail} from "../../../../shared/models/route-detail";
import {PropertyDetail} from "../../../../shared/models/property-detail";
import {BulkyItems} from "../../../../shared/models/bulkyItems";
import {TranslateModule} from "@ngx-translate/core";
import {Property} from "../../../../shared/models/property";
import {Trip} from "../../../../shared/models/trip";

@Component({
  selector: 'app-moving-service-summary',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatStepperModule, MatCardModule, TranslateModule],
  templateUrl: './moving-service-summary.component.html',
  styleUrls: ['./moving-service-summary.component.css']
})
export class MovingServiceSummaryComponent implements OnInit, OnChanges{
  @Input() tripForm: FormGroup;
  @Input() propertyForm: FormGroup;
  @Input() bulkyItemsForm: FormGroup;
  @Input() movingDateForm: FormGroup;
  @Input() isMobile: boolean;
  @Input() formUpdated: boolean;

  trip: Trip;
  property: Property;
  bulkyItems: BulkyItems;
  movingDate: Date;

  constructor() {
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.trip = this.tripForm.value;
    this.property = this.propertyForm.value;
    this.bulkyItems = this.bulkyItemsForm.value;
    this.movingDate = this.movingDateForm.value.date;
    }


}
