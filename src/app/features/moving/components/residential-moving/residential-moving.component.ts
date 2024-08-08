import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {GoogleMapsModule } from '@angular/google-maps';
import {MatStepperModule, StepperOrientation} from "@angular/material/stepper";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {OrderDetailComponent} from "../order-detail/order-detail.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {TranslateModule} from "@ngx-translate/core";
import {TripInfoComponent} from "../trip-info/trip-info.component";
import {ContactInfoComponent} from "../../../../shared/component/contact-info/contact-info.component";
import {ResponsiveDesignService} from "../../../../core/services/responsive-design/responsive-design.service";
import {MovingOrderService} from "../../services/moving-order-service/moving-order.service";
import {MovingType} from "../../enums/moving-type";
import {OrderStatus} from "../../enums/order-status";
import {Store} from "@ngrx/store";
import {MovingOrderActions} from "../../../../core/store/moving-order/moving-order.actions";
import {SCREEN_SIZE} from "../../../../shared/enums/screen-size";

@Component({
  selector: 'app-moving-order',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, GoogleMapsModule, ReactiveFormsModule,
    MatStepperModule, MatSelectModule, MatButtonModule, OrderDetailComponent, MatDatepickerModule, MatNativeDateModule, TranslateModule, TripInfoComponent, ContactInfoComponent],
  templateUrl: "./residential-moving.component.html",
  styleUrls: ['./residential-moving.component.css']
})
export class ResidentialMovingComponent implements OnInit, AfterViewInit {

  public formUpdated = false;
  movingType = MovingType.Residential;
  orientation: StepperOrientation = 'vertical';

  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;

  directionsResults: google.maps.DirectionsResult | undefined;

  properties = [
    {value: 'condo', viewValue: "MOVING.CONDO.LABEL"},
    {value: 'town house', viewValue: 'MOVING.TOWNHOUSE.LABEL'},
    {value: 'house', viewValue: 'MOVING.HOUSE.LABEL'}
  ];

  counts=  [
    {value: '0', viewValue: '0'},
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
    {value: '4', viewValue: '4'},
    {value: '5', viewValue: '5'},
    {value: '6', viewValue: '6'}
  ];

  contactInfoFormCompleted: Boolean;
  propertyForm: FormGroup;
  movingDateForm: FormGroup;
  bulkyItemsForm: FormGroup;
  constructor(private _formBuilder: FormBuilder, private store: Store,
              private rwd: ResponsiveDesignService, private movingOrderService: MovingOrderService) {
    this.rwd.onResize$.subscribe(size => {
      if(size === SCREEN_SIZE.XS){
        this.orientation = 'vertical';
      }else{
        this.orientation = 'horizontal';
      }
    });
  }

  ngOnInit(): void {
    this.propertyForm = this.movingOrderService.createPropertyForm();
    this.bulkyItemsForm = this.movingOrderService.createBulkItemsForm()
    this.movingDateForm = this.movingOrderService.createMovingDateForm(this._formBuilder);
  }

  ngAfterViewInit(): void {
  }
  updateTripInfo(event: any){
    if(event === 'next'){
      this.directionsResults = this.movingOrderService.directionsResults ;}
  }

  updatePropertyInfo(){
    this.movingOrderService.updatePropertyInfo(this.propertyForm);
  }
  onUpdateBulkyItems(){
    this.movingOrderService.updateBulkyItems(this.bulkyItemsForm);
  }

  addContactInfo(contactInfoForm: FormGroup){
    this.contactInfoFormCompleted = true;
  }

  onSubmit(){
    const order = this.movingOrderService.movingOrder;
    order["id"] = order['contact'].phone + '-' + new Date().toISOString().slice(0, 10);
    order["type"] = this.movingType;
    order['status'] = OrderStatus.Placed;
    this.store.dispatch(MovingOrderActions.saveMovingOrder({movingOrder: order}));
  }
  onDatePickComplete() {
    this.movingOrderService.updateDateForm(this.movingDateForm);
    this.formUpdated = true;
  }
}
