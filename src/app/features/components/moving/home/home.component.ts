import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatListModule} from "@angular/material/list";
import {last} from "rxjs";
import {TranslateModule} from "@ngx-translate/core";
export interface TruckRateElement {
  length: string;
  capacity: string;
  rate: string;
  busyDayRate: string;
}

export interface feeElement {
  description: string;
}


const ELEMENT_DATA: TruckRateElement[] = [
  {length: '26 feet', capacity: '12000 lbs/1700 cubic ft', rate: '$115/hour', busyDayRate: '$125/hour'},
  {length: '20 feet', capacity: '5700 lbs/960 cubic ft', rate: '$105/hour', busyDayRate: '$115/hour'},
];


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, FlexModule, MatButtonModule, MatTabsModule, MatTableModule, MatListModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  displayedColumns: string[] = ['length', 'capacity', 'rate', 'busyDayRate'];
  dataSource = new MatTableDataSource<TruckRateElement>(ELEMENT_DATA);
  feeItems: feeElement[] = [
    {description: 'MOVING.SERVICE.RESIDENTIAL.RATE.RULE.1'},
    {description: 'Traveling charge and fuel charge may apply to certain areas of GTA.'},
    {description: 'Stair fee $10 per floor. One-time charge.'},
    {description: 'Rate for an additional mover is $45/hr/person.'},
    {description: 'Piano is subject to additional charges of CAD$100.'},
    {description: 'Marble furniture is subject to additional charges of CAD$100.'},
    {description: 'Refrigerator is subject to additional charges of CAD$60.'},
    {description: 'Any location 100km away from Toronto is subject to long-distance mileage charge.'},
    {description: 'ong distance move is subject to a min. 2 hrs loading time and a min. 2 hrs of unloading time. *Applicable tax is extra.'},
    {description: 'For more detailed information regarding the long-distance move, please contact us at 4163008683.'},
  ];
  constructor(private router: Router) {
  }

  toQuotation() {
    this.router.navigate(['quotation']);
  }

}
