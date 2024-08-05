import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatListModule} from "@angular/material/list";
import {TranslateModule} from "@ngx-translate/core";
import {select, Store} from "@ngrx/store";
import {ImageActions} from "../../../../core/store/images/image.actions";
import { selectImage} from "../../../../core/store/images/image.selectors";

export interface TruckRateElement {
  length: string;
  capacity: string;
  rate: string;
  busyDayRate: string;
  description: string;
}

const ELEMENT_DATA: TruckRateElement[] = [
  {length: '26 feet', capacity: '12000 lbs/1700 cubic ft', rate: '$115/hour', busyDayRate: '$125/hour', description: ''},
  {length: '20 feet', capacity: '5700 lbs/960 cubic ft', rate: '$105/hour', busyDayRate: '$115/hour', description:''},
];

const SMALL_MOVING_DATA: TruckRateElement[] = [
  {length: '12 feet', capacity: '3500 lbs', rate: '$40/hour', busyDayRate: '$50/hour',
    description: 'This service is for single persons living in a room or just need a little help with some items like desks or furniture.' +
      'Most of them do not have much stuff, so we offer a affordable price for this kind of moving.' +
      'For precise quote, please up a picture of your stuff.'}
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, FlexModule, MatButtonModule, MatTabsModule, MatTableModule, MatListModule, TranslateModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  displayedColumns: string[] = ['length', 'capacity', 'rate', 'busyDayRate'];
  dataSource = new MatTableDataSource<TruckRateElement>(ELEMENT_DATA);
  vanDataSource = new MatTableDataSource<TruckRateElement>(SMALL_MOVING_DATA);
  feeItems = new Array<number>(7);

  packing$ = this.store.pipe(select(selectImage('packing.jpg')));
  smallMoving$ = this.store.pipe(select(selectImage('smallMoving.jpg')));
  fleet$ = this.store.pipe(select(selectImage('fleet.jpg')));

  constructor(private router: Router, private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(ImageActions.loadImages());
  }

  toMakeAnAppointment() {
    this.router.navigate(['residential-moving-appointment']);
  }

  toSmallMovingRequest(){
    this.router.navigate(['small-moving-quotation']);
  }

  protected readonly SMALL_MOVING_DATA = SMALL_MOVING_DATA;
}
