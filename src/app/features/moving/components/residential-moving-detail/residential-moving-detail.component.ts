import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {GoogleMapsModule, MapDirectionsService} from '@angular/google-maps';
import {catchError, map, Observable, of, tap} from "rxjs";
import {MatStepperModule, StepperOrientation} from "@angular/material/stepper";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MovingServiceSummaryComponent} from "../moving-service-summary/moving-service-summary.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {TranslateModule} from "@ngx-translate/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Trip} from "../../models/trip";
import {Property} from "../../models/property";
import {BulkyItems} from "../../models/bulkyItems";
import {Contact} from "../../services/models/contact";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Event, Router} from "@angular/router";
import {FirestoreService} from "../../../../core/services/firestore-service/firestore.service";
import {MovingOrder, ResidentialMovingOrder} from "../../models/moving-order";
import {TripInfoComponent} from "../trip-info/trip-info.component";
import {ContactInfoComponent} from "../../../../shared/component/contact-info/contact-info.component";
import {ResponsiveDesignService} from "../../../../core/services/responsive-design/responsive-design.service";
import {MovingOrderService} from "../../services/moving-order-service/moving-order.service";

@Component({
  selector: 'app-residential-moving-detail',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, GoogleMapsModule, ReactiveFormsModule,
    MatStepperModule, MatSelectModule, MatButtonModule, MovingServiceSummaryComponent, MatDatepickerModule, MatNativeDateModule, TranslateModule, TripInfoComponent, ContactInfoComponent],
  templateUrl: "./residential-moving-detail.component.html",
  styleUrls: ['./residential-moving-detail.component.css']
})
export class ResidentialMovingDetailComponent implements OnInit, AfterViewInit {

  public isMobile=false;
  public formUpdated = false;
  orientation: StepperOrientation = 'vertical';

  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;

  directionsResults: google.maps.DirectionsResult | undefined;

  properties = [
    {value: 'condo', viewValue: 'Condo'},
    {value: 'town house', viewValue: 'Town house'},
    {value: 'house', viewValue: 'Semi/Detached'}
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

  // tripForm: FormGroup;
  // contactForm: FormGroup;
  propertyForm: FormGroup;
  movingDateForm: FormGroup;
  bulkyItemsForm: FormGroup;


  constructor(private _formBuilder: FormBuilder, private firestoreSevice: FirestoreService,
              private rwd: ResponsiveDesignService, private movingOrderService: MovingOrderService, private router: Router) {
    this.orientation = rwd.orientation;
  }

  ngOnInit(): void {
    this.isMobile = true;
    // this.tripForm = this._formBuilder.group({
    //       from: ['', [Validators.required]],
    //       to: ['', [Validators.required]],
    //       distance: [''],
    //       duration: ['']
    //     });

    this.propertyForm = this._formBuilder.group( {
            residentialType: ['', [Validators.required]],
            rooms: ['', [Validators.required]]
          });
    this.bulkyItemsForm = this._formBuilder.group({
            piano: ['', [Validators.required]],
            marbleFurniture: ['', [Validators.required]],
            refrigerator: ['', [Validators.required]]
          });

    this.movingDateForm = this.movingOrderService.createMovingDateForm(this._formBuilder);

    // this.contactForm = this.movingOrderService.createContactForm(this._formBuilder);
  }

  ngAfterViewInit(): void {
  }
  updateTripInfo(event: any){
    if(event === 'next'){
    this.directionsResults = this.movingOrderService.directionsResults ;}
  }

  addContactInfo(contactInfoForm: FormGroup){
    // this.movingOrderService.addContactInfo(this.contactForm, contactInfoForm);
    this.contactInfoFormCompleted = true;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.rwd.onWindowResize(event);
    this.orientation = this.rwd.orientation;
    this.isMobile = this.rwd.isMobile;
  }

  onSubmit(){
    const moving_order: ResidentialMovingOrder = {
          // trip: this.tripForm.value,
          trip: this.movingOrderService.tripForm.value,
          property: this.propertyForm.value,
          bulkyItems: this.bulkyItemsForm.value,
          movingDate: this.movingDateForm.value.date,
          contact: this.movingOrderService.contactInfoForm.value
      }
    this.firestoreSevice.save(moving_order).then(response =>
    {this.router.navigate(['thankyou'])}).catch(error => { console.log(error); })
  }

  onDatePickComplete() {
    this.movingOrderService.updateDateForm(this.movingDateForm);
    this.formUpdated = true;
  }
}
