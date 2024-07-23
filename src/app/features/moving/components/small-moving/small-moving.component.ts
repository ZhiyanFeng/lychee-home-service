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
import {MovingServiceSummaryComponent} from "../moving-service-summary/moving-service-summary.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {TripInfoComponent} from "../trip-info/trip-info.component";
import {FirestoreService} from "../../../../core/services/firestore-service/firestore.service";
import {Event, Router} from "@angular/router";
import {ResponsiveDesignService} from "../../../../core/services/responsive-design/responsive-design.service";
import {MovingOrderService} from "../../services/moving-order-service/moving-order.service";

import {SmallMovingOrder} from "../../models/moving-order";
import {FileUploadComponent} from "../../../../shared/component/file-upload/file-upload.component";
import {DataTableComponent} from "../data-table/data-table.component";
import {selectPayloadById} from "../../../../core/store/payload/payload.selectors";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-small-moving',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, GoogleMapsModule, ReactiveFormsModule,
    MatStepperModule, MatSelectModule, MatButtonModule, MovingServiceSummaryComponent, MatDatepickerModule,
    MatNativeDateModule, TranslateModule, TripInfoComponent, ContactInfoComponent, FileUploadComponent, DataTableComponent],
  templateUrl: './small-moving.component.html',
  styleUrls: ['./small-moving.component.css']
})

export class SmallMovingComponent implements OnInit, AfterViewInit{
  @ViewChild('tripInfoComponent') tripInfoComponent: TripInfoComponent;
  @ViewChild('contactInfoComponent') contactInfoComponent: ContactInfoComponent;
  @ViewChild('picker') datePicker: MatDatepicker<Date>;
  @ViewChild('stepper') stepper: MatStepper;


  isMobile: Boolean;
  tripInfoForm: FormGroup;
  movingDateForm: FormGroup;
  contactInfoForm: FormGroup;
  movingDetail: any = {};

  directionsResults: google.maps.DirectionsResult;
  orientation: StepperOrientation = 'vertical';
  isLinear = true;
  uploadFilePath = '/small-moving/';
  _downloadURLS;

  center: google.maps.LatLngLiteral = {lat: 43.651070, lng: -79.347015};
  zoom = 4;

  constructor(private _formBuilder: FormBuilder, private store: Store,
              private firestoreSevice: FirestoreService, private router: Router, private rwd: ResponsiveDesignService,
              private movingOrderService: MovingOrderService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.orientation = this.rwd.orientation;
    this.isMobile = this.rwd.isMobile;
    this.movingDateForm = this.movingOrderService.createMovingDateForm(this._formBuilder);
    this.contactInfoForm = this.movingOrderService.createContactForm(this._formBuilder);

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

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.rwd.onWindowResize(event);
    this.orientation = this.rwd.orientation;
    this.isMobile = this.rwd.isMobile;
  }
  updateTripInfo(event: any){
    if(event === 'next'){
      this.directionsResults = this.movingOrderService.directionsResults ;}
  }

  updateUploadPath(){
    this.uploadFilePath += this.movingOrderService.contactInfoForm.value['phone'] + '/';
  }

  onDatePick(){
    this.movingOrderService.updateDateForm(this.movingDateForm);
  }

  uploadFileComplete(event: any){
    this.movingOrderService.initDetails();
    this.movingDetail = this.movingOrderService.movingDetails;
    this.stepper.next();
  }

  onSubmit(){
    this.store.select(selectPayloadById({id: this.contactInfoForm.value['phone']})).subscribe(
      payload => {
        this._downloadURLS = payload;
      });
    const moving_order:SmallMovingOrder = {
      trip: this.movingOrderService.tripForm.value,
      movingDate: this.movingDateForm.value.date,
      contact: this.movingOrderService.contactInfoForm.value,
      payload: this._downloadURLS
    }
    this.firestoreSevice.saveSmallMovingOrder(moving_order)
      .then(response =>{ this.router.navigate(['/moving/thank-you'])});
  }

}
