import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GoogleMapsModule, MapDirectionsService} from '@angular/google-maps';
import {catchError, map, Observable, of, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-quotation',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, GoogleMapsModule, ReactiveFormsModule],
  templateUrl: "./quotation.component.html",
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit, AfterViewInit{
  placeHolder: string;
  @ViewChild('from', {static: false}) from: ElementRef;
  @ViewChild('to', {static: false}) to: ElementRef;
  apiLoaded: Observable<boolean>;

  originalLocation: google.maps.places.Autocomplete | undefined;
  destinationLocation: google.maps.places.Autocomplete | undefined;

  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;

  directionsResults$: Observable<google.maps.DirectionsResult|undefined>;

  quotationForm: FormGroup;

  constructor(private fb: FormBuilder, private mapDirectionsService: MapDirectionsService) {

  }

  ngOnInit(): void {
    this.quotationForm = this.fb.group({
      from: '',
      to: '',
    })
  }



  ngAfterViewInit(): void {
    this.originalLocation = new google.maps.places.Autocomplete(this.from.nativeElement);
    this.originalLocation.addListener("place_changed", ()=>{
      const place = this.originalLocation.getPlace();
      console.log(place);
    })

    this.destinationLocation = new google.maps.places.Autocomplete(this.to.nativeElement);
    this.destinationLocation.addListener("place_changed", ()=>{
      const place = this.destinationLocation.getPlace();
      console.log(place);
    })
  }

  onSubmit(form: FormGroup){
    const request: google.maps.DirectionsRequest = {
      destination: {lat: this.destinationLocation.getPlace().geometry.location.lat(), lng: this.destinationLocation.getPlace().geometry.location.lng()},
      origin: {lat: this.originalLocation.getPlace().geometry.location.lat(), lng: this.originalLocation.getPlace().geometry.location.lng()},
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map(response => response.result), tap((response)=> {
      console.log(response)
    }));

  }
}
