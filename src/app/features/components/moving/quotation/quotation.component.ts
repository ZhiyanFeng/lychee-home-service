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
import {Trip} from "../../../../shared/models/trip";
import {Property} from "../../../../shared/models/property";
import {BulkyItems} from "../../../../shared/models/bulkyItems";
import {Contact} from "../../../../shared/models/contact";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Router} from "@angular/router";
import {FirestoreService} from "../../../../core/services/firestore-service/firestore.service";
import {MovingOrder} from "../../../../shared/models/movingOrder";

@Component({
  selector: 'app-quotation',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, GoogleMapsModule, ReactiveFormsModule,
    MatStepperModule, MatSelectModule, MatButtonModule, MovingServiceSummaryComponent, MatDatepickerModule, MatNativeDateModule, TranslateModule],
  templateUrl: "./quotation.component.html",
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit, AfterViewInit {
  placeHolder: string;
  @ViewChild('from', {static: false}) from: ElementRef;
  @ViewChild('to', {static: false}) to: ElementRef;
  apiLoaded: Observable<boolean>;
  public isMobile=false;
  public formUpdated = false;
  orientation: StepperOrientation = 'vertical';

  originalLocation: google.maps.places.Autocomplete | undefined;
  destinationLocation: google.maps.places.Autocomplete | undefined;

  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;

  directionsResults$: Observable<google.maps.DirectionsResult | undefined>;
  toChange=false;

  formGroup: FormGroup;
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

  trip: Trip;
  property: Property;
  bulkyItems: BulkyItems;
  contact: Contact;
  movingDate : Date;


  constructor(private _formBuilder: FormBuilder, private mapDirectionsService: MapDirectionsService, private firestoreSevice: FirestoreService, private router: Router) {
    let screenWidth = window.innerWidth;
    if(screenWidth>390){
      this.orientation = 'horizontal';
    }else{
      this.orientation = 'vertical';
    }
  }

  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  ngOnInit(): void {
    this.isMobile = true
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          from: ['', [Validators.required]],
          to: ['', [Validators.required]],
          distance: [''],
          duration: ['']
        }),
        this._formBuilder.group({
            residentialType: ['', [Validators.required]],
            rooms: ['', [Validators.required]]
          }
        ),
        this._formBuilder.group({
            piano: ['', [Validators.required]],
            marbleFurniture: ['', [Validators.required]],
            refrigerator: ['', [Validators.required]]
          }
        ),
        this._formBuilder.group({
            date: ['', [Validators.required]]
          }),
        this._formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required]],
          }
        )
      ])
    })
  }


  ngAfterViewInit(): void {
    this.originalLocation = new google.maps.places.Autocomplete(this.from.nativeElement);
    this.destinationLocation = new google.maps.places.Autocomplete(this.to.nativeElement);
  }

  setAddress(){
    let routeDetail = this.formGroup.get('formArray').get([0]);
    routeDetail.value['from'] = this.originalLocation.getPlace().formatted_address;
    routeDetail.value['to'] = this.destinationLocation.getPlace().formatted_address;
  }
  step1Complete() {
    this.setAddress();
    const request: google.maps.DirectionsRequest = {
      destination: {
        lat: this.destinationLocation.getPlace().geometry.location.lat(),
        lng: this.destinationLocation.getPlace().geometry.location.lng()
      },
      origin: {
        lat: this.originalLocation.getPlace().geometry.location.lat(),
        lng: this.originalLocation.getPlace().geometry.location.lng()
      },
      travelMode: google.maps.TravelMode.DRIVING,
    };
    this.directionsResults$ = this.mapDirectionsService.route(request)
      .pipe(
        map(response => response.result),
        tap((response) => {
          this.formGroup.get('formArray').get([0]).value['distance'] = response.routes[0].legs[0].distance.text;
          this.formGroup.get('formArray').get([0]).value['duration'] = response.routes[0].legs[0].duration.text;
        }
        ));
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    let screenWidth = window.innerWidth;
    if(screenWidth>390){
      this.orientation = 'horizontal';
      this.isMobile = false;
    }else{
      this.orientation = 'vertical';
      this.isMobile = true;
    }
  }

  onSubmit(formGroup: FormGroup){
    this.trip = formGroup.get('formArray').get([0]).value;
    this.property = formGroup.get('formArray').get([1]).value;
    this.bulkyItems = formGroup.get('formArray').get([2]).value;
    this.movingDate = formGroup.get('formArray').get([3]).value.date;
    this.contact = formGroup.get('formArray').get([4]).value;

    const moving_order:MovingOrder = {
          trip: this.trip,
          property: this.property,
          bulkyItems: this.bulkyItems,
          movingDate: this.movingDate,
          contact: this.contact
      }

    this.firestoreSevice.save(moving_order);
  }



  step5Complete() {
    this.formUpdated = true;
  }

}
