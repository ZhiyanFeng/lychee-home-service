import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactInfoComponent} from "../../../../shared/component/contact-info/contact-info.component";
import {GoogleMapsModule, MapDirectionsService} from "@angular/google-maps";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatStepperModule, StepperOrientation} from "@angular/material/stepper";
import {MovingServiceSummaryComponent} from "../moving-service-summary/moving-service-summary.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {TripInfoComponent} from "../trip-info/trip-info.component";
import {FirestoreService} from "../../../../core/services/firestore-service/firestore.service";
import {Event, Router} from "@angular/router";
import {ResponsiveDesignService} from "../../../../core/services/responsive-design/responsive-design.service";
import {MovingFormService} from "../../../../core/services/moving-form-service/moving-form.service";

import {MovingOrder} from "../../../../shared/models/movingOrder";

@Component({
  selector: 'app-small-moving-detail',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, GoogleMapsModule, ReactiveFormsModule,
    MatStepperModule, MatSelectModule, MatButtonModule, MovingServiceSummaryComponent, MatDatepickerModule,
    MatNativeDateModule, TranslateModule, TripInfoComponent, ContactInfoComponent],
  templateUrl: './small-moving-detail.component.html',
  styleUrls: ['./small-moving-detail.component.css']
})

export class SmallMovingDetailComponent implements OnInit{
  @ViewChild('tripInfoComponent') tripInfoComponent: TripInfoComponent;
  @ViewChild('contactInfoComponent') contactInfoComponent: ContactInfoComponent;

  isMobile: Boolean;
  tripForm: FormGroup;
  movingDateForm: FormGroup;
  contactForm: FormGroup;

  directionsResults: google.maps.DirectionsResult;
  contactInfoFormCompleted: Boolean;
  orientation: StepperOrientation = 'vertical';
  isLinear = true;

  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;

  constructor(private _formBuilder: FormBuilder, private mapDirectionsService: MapDirectionsService,
              private firestoreSevice: FirestoreService, private router: Router, private rwd: ResponsiveDesignService,
              private movingFormService: MovingFormService) {
  }

  ngOnInit(): void {
    this.orientation = this.rwd.orientation;
    this.isMobile = true;
    this.tripForm = this._formBuilder.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      distance: [''],
      duration: ['']
    });

    this.movingDateForm = this._formBuilder.group({
      date: ['', [Validators.required]]
    });

    this.contactForm = this._formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
      }
    )
  }

  get tripInfoForm() {
    if(this.tripInfoComponent!=null){
      return this.tripInfoComponent.tripInfoForm;
    }
    return this.tripForm;
  }

  get contactInfoForm() {
    if(this.contactInfoComponent!=null){
      return this.contactInfoComponent.contactInfoFrom;
    }
    return this.contactForm;
  }
  addTripInfo(newTripInfo: google.maps.DirectionsResult){
    this.directionsResults = newTripInfo;
    this.movingFormService.addTripInfo(this.tripForm, newTripInfo);
  }

  addContactInfo(contactInfoForm: FormGroup){
    this.movingFormService.addContactInfo(this.contactForm, contactInfoForm);
    this.contactInfoFormCompleted = true;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.rwd.onWindowResize(event);
    this.orientation = this.rwd.orientation;
    this.isMobile = this.rwd.isMobile;
  }

  onSubmit(){
    // const moving_order:MovingOrder = {
    //   trip: this.tripForm.value,
    //   movingDate: this.movingDateForm.value.date,
    //   contact: this.contactForm.value
    // }
    // this.firestoreSevice.save(moving_order);
  }

}
