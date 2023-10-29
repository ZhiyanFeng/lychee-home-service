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
import {ServiceSummaryComponent} from "../service-summary/service-summary.component";
import {N} from "@angular/cdk/keycodes";
import {RouteDetail} from "../../../core/models/route-detail";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-quotation',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, GoogleMapsModule, ReactiveFormsModule,
    MatStepperModule, MatSelectModule, MatButtonModule, ServiceSummaryComponent, MatDatepickerModule, MatNativeDateModule, TranslateModule],
  templateUrl: "./quotation.component.html",
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit, AfterViewInit {
  placeHolder: string;
  @ViewChild('from', {static: false}) from: ElementRef;
  @ViewChild('to', {static: false}) to: ElementRef;
  apiLoaded: Observable<boolean>;
  public isMobile=false;
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


  constructor(private _formBuilder: FormBuilder, private mapDirectionsService: MapDirectionsService) {
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
    }else{
      this.orientation = 'verticalgi';
    }
  }


  step2Complete(){
    // this.toChange = true;
    // console.log(this.formGroup.get('formArray').get([1]));
  }

  step3Complete(){
    this.toChange = true;
    console.log(this.formGroup.get('formArray').get([2]));
  }
  onSubmit(formGroup: FormGroup){

  }

}
