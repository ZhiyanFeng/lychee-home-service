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

@Component({
  selector: 'app-moving-service-summary',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatStepperModule, MatCardModule, TranslateModule],
  templateUrl: './moving-service-summary.component.html',
  styleUrls: ['./moving-service-summary.component.css']
})
export class MovingServiceSummaryComponent implements OnInit, OnChanges{
  @Input() quotationForm: FormGroup;
  @Input() isMobile: boolean;
  @Input() formUpdated: boolean;

  routeDetail: RouteDetail;
  propertyDetail: PropertyDetail;
  bulkyItems: BulkyItems;
  movingDate: Date;

  constructor() {
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.routeDetail = this.quotationForm.get('formArray').get([0]).value;
    this.propertyDetail = this.quotationForm.get('formArray').get([1]).value;
    this.bulkyItems = this.quotationForm.get('formArray').get([2]).value;
    this.movingDate = this.quotationForm.get('formArray').get([3]).value.date;
    }


}
