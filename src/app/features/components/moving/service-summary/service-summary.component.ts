import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from "@angular/material/stepper";
import {MatCardModule} from "@angular/material/card";
import {RouteDetail} from "../../../../shared/models/route-detail";
import {PropertyDetail} from "../../../../shared/models/property-detail";

@Component({
  selector: 'app-service-summary',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatStepperModule, MatCardModule],
  templateUrl: './service-summary.component.html',
  styleUrls: ['./service-summary.component.css']
})
export class ServiceSummaryComponent implements OnInit, OnChanges{
  @Input() quotationForm: FormGroup;
  @Input() toChange: boolean;
  @Input() isMobile: boolean;
  routeDetail: RouteDetail;
  propertyDetail: PropertyDetail;

  constructor() {
  }
  ngOnInit(): void {
  }

  step3Complete() {
    console.log(this.routeDetail);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.routeDetail = this.quotationForm.get('formArray').get([0]).value;
    this.propertyDetail = this.quotationForm.get('formArray').get([1]).value;
  }
}
