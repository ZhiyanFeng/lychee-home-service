import {AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactInfoComponent} from "../../../../shared/component/contact-info/contact-info.component";
import {GoogleMapsModule, MapDirectionsService} from "@angular/google-maps";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatStepper, MatStepperModule, StepperOrientation} from "@angular/material/stepper";
import {OrderDetailComponent} from "../order-detail/order-detail.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {TripInfoComponent} from "../trip-info/trip-info.component";
import {Router} from "@angular/router";
import {ResponsiveDesignService} from "../../../../core/services/responsive-design/responsive-design.service";
import {MovingOrderService} from "../../services/moving-order-service/moving-order.service";
import {MovingOrder} from "../../models/moving-order";
import {FileUploadComponent} from "../../../../shared/component/file-upload/file-upload.component";
import {DataTableComponent} from "../data-table/data-table.component";
import {selectPayloadById} from "../../../../core/store/payload/payload.selectors";
import {Store} from "@ngrx/store";
import {MovingType} from "../../enums/moving-type";
import {OrderStatus} from "../../enums/order-status";
import {MovingOrderActions} from "../../../../core/store/moving-order/moving-order.actions";
import {SCREEN_SIZE} from "../../../../shared/enums/screen-size";

@Component({
  selector: 'app-small-moving',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, GoogleMapsModule, ReactiveFormsModule,
    MatStepperModule, MatSelectModule, MatButtonModule, OrderDetailComponent, MatDatepickerModule,
    MatNativeDateModule, TranslateModule, TripInfoComponent, ContactInfoComponent, FileUploadComponent, DataTableComponent],
  templateUrl: './small-moving.component.html',
  styleUrls: ['./small-moving.component.css']
})

export class SmallMovingComponent implements OnInit, AfterViewInit{
  @ViewChild('tripInfoComponent') tripInfoComponent: TripInfoComponent;
  @ViewChild('contactInfoComponent') contactInfoComponent: ContactInfoComponent;
  @ViewChild('picker') datePicker: MatDatepicker<Date>;
  @ViewChild('stepper') stepper: MatStepper;


  order: MovingOrder;
  tripInfoForm: FormGroup;
  movingDateForm: FormGroup;
  contactInfoForm: FormGroup;
  movingDetail: any = {};
  movingType = MovingType.Small;
  formUpdated: boolean = false;

  directionsResults: google.maps.DirectionsResult;
  orientation: StepperOrientation = 'vertical';
  isLinear = true;
  uploadFilePath = '/small-moving/';
  _downloadURLS;

  center: google.maps.LatLngLiteral = {lat: 43.651070, lng: -79.347015};
  zoom = 4;

  constructor(private _formBuilder: FormBuilder, private store: Store,
              private router: Router, private rwd: ResponsiveDesignService,
              private movingOrderService: MovingOrderService, private cd: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.movingDateForm = this.movingOrderService.createMovingDateForm(this._formBuilder);
    this.contactInfoForm = this.movingOrderService.createContactForm(this._formBuilder);
    this.movingOrderService.order$.subscribe(order => {
      debugger;
      this.order = order;
    })
    this.rwd.onResize$.subscribe(size => {
      debugger;
      if(size === SCREEN_SIZE.XS){
        this.orientation = 'vertical';
      }else{
        this.orientation = 'horizontal';
      }
    });
  }
  ngAfterViewInit(){
    if(this.tripInfoComponent.isReady){
      this.tripInfoForm = this.tripInfoComponent.tripInfoForm;
    }
    if(this.contactInfoComponent.isReady){
      this.contactInfoForm = this.contactInfoComponent.contactInfoFrom;
    }
    this.cd.detectChanges();
  }
  updateTripInfo(event: any){
    if(event === 'next'){
      this.directionsResults = this.movingOrderService.directionsResults;
    }
  }

  updateUploadPath(){
    this.uploadFilePath += this.movingOrderService.contactInfoForm.value['phone'] + '/';
  }
  onDatePick(){
    debugger;
    this.movingOrderService.updateDateForm(this.movingDateForm);
  }

  uploadFileComplete(event: any){
    this.stepper.next();
    console.log(this.order);
  }

  onSubmit(){
    this.store.select(selectPayloadById({id: this.contactInfoForm.value['phone']})).subscribe(
      payload => {
        this._downloadURLS = payload;
      });
    const moving_order:MovingOrder = {
      id: this.movingOrderService.contactInfoForm.value['phone'],
      type: MovingType.Small,
      status: OrderStatus.Pending,
      trip: this.movingOrderService.tripForm.value,
      movingDate: this.movingDateForm.value.date,
      contact: this.movingOrderService.contactInfoForm.value,
      payload: this._downloadURLS
    }
    this.store.dispatch(MovingOrderActions.saveMovingOrder({movingOrder: moving_order}));
  }

}
