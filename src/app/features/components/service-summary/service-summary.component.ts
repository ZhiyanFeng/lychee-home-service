import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from "@angular/material/stepper";
import {MatCardModule} from "@angular/material/card";
import {RouteDetail} from "../../../core/models/route-detail";
import {PropertyDetail} from "../../../core/models/property-detail";

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
  routeDetail: RouteDetail;
  propertyDetail: PropertyDetail;

  ngOnInit(): void {
  }
  constructor() {
  }

  step3Complete() {
    console.log(this.routeDetail);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.routeDetail = this.quotationForm.get('formArray').get([0]).value;
    this.propertyDetail = this.quotationForm.get('formArray').get([1]).value;
  }
}
