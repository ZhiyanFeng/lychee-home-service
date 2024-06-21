import {AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactInfoComponent} from "../../../../shared/component/contact-info/contact-info.component";
import {GoogleMapsModule, MapDirectionsService} from "@angular/google-maps";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatStepper, MatStepperModule, StepperOrientation} from "@angular/material/stepper";
import {MovingServiceSummaryComponent} from "../moving-service-summary/moving-service-summary.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {TripInfoComponent} from "../trip-info/trip-info.component";
import {FirestoreService} from "../../../../core/services/firestore-service/firestore.service";
import {Event, Router} from "@angular/router";
import {ResponsiveDesignService} from "../../../../core/services/responsive-design/responsive-design.service";
import {MovingDetailService} from "../../services/moving-detail-service/moving-detail.service";

import {MovingOrder} from "../../models/moving-order";
import {FileUploadComponent} from "../../../../shared/component/file-upload/file-upload.component";
import {DataTableComponent} from "../data-table/data-table.component";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-small-moving-detail',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, GoogleMapsModule, ReactiveFormsModule,
    MatStepperModule, MatSelectModule, MatButtonModule, MovingServiceSummaryComponent, MatDatepickerModule,
    MatNativeDateModule, TranslateModule, TripInfoComponent, ContactInfoComponent, FileUploadComponent, DataTableComponent],
  templateUrl: './small-moving-detail.component.html',
  styleUrls: ['./small-moving-detail.component.css']
})

export class SmallMovingDetailComponent implements OnInit, AfterViewInit{
  @ViewChild('tripInfoComponent') tripInfoComponent: TripInfoComponent;
  @ViewChild('contactInfoComponent') contactInfoComponent: ContactInfoComponent;
  @ViewChild('picker') datePicker: MatDatepicker<Date>;
  @ViewChild('stepper') stepper: MatStepper;


  isMobile: Boolean;
  tripInfoForm: FormGroup;
  movingDateForm: FormGroup;
  contactInfoForm: FormGroup;
  uploadStepCompleted = false;
  movingDetail: any = {};

  directionsResults: google.maps.DirectionsResult;
  orientation: StepperOrientation = 'vertical';
  isLinear = true;
  uploadFilePath = '/small-moving/';

  center: google.maps.LatLngLiteral = {lat: 43.651070, lng: -79.347015};
  zoom = 4;

  constructor(private _formBuilder: FormBuilder, private mapDirectionsService: MapDirectionsService,
              private firestoreSevice: FirestoreService, private router: Router, private rwd: ResponsiveDesignService,
              private movingDetailService: MovingDetailService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.orientation = this.rwd.orientation;
    this.isMobile = this.rwd.isMobile;
    this.movingDateForm = this.movingDetailService.createMovingDateForm(this._formBuilder);
    this.contactInfoForm = this.movingDetailService.createContactForm(this._formBuilder);
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
      this.directionsResults = this.movingDetailService.directionsResults ;}
  }

  updateUploadPath(){
    this.uploadFilePath += this.movingDetailService.contactInfoForm.value['phone'] + '/';
  }

  onDatePick(){
    this.movingDetailService.updateDateForm(this.movingDateForm);
  }

  uploadFileComplete(event: any){
    this.movingDetailService.initDetails();
    this.movingDetail = this.movingDetailService.movingDetails;
    this.stepper.next();
  }


  onSubmit(){
    console.log("abc");
    // const moving_order:MovingOrder = {
    //   trip: this.tripForm.value,
    //   movingDate: this.movingDateForm.value.date,
    //   contact: this.contactForm.value
    // }
    // this.firestoreSevice.save(moving_order);
  }

}
