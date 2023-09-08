import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, FormsModule} from "@angular/forms";
import {GoogleMapsModule, MapDirectionsService} from '@angular/google-maps';
import {catchError, map, Observable, of, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, GoogleMapsModule],
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit, AfterViewInit{
  placeHolder: string;
  @ViewChild('from', {static: false}) from: ElementRef;
  @ViewChild('to', {static: false}) to: ElementRef;
  apiLoaded: Observable<boolean>;

  originalLocation: google.maps.places.Autocomplete | undefined;
  destinationLocation: google.maps.places.Autocomplete | undefined;

  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;
  quotationForm: FormGroup;

  readonly directionsResults$: Observable<google.maps.DirectionsResult|undefined>;

  constructor(private fb: FormBuilder, mapDirectionsService: MapDirectionsService) {
    const request: google.maps.DirectionsRequest = {
      destination: {lat: 12, lng: 4},
      origin: {lat: 14, lng: 8},
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsResults$ = mapDirectionsService.route(request).pipe(map(response => response.result), tap((response)=> {
      console.log(response)
    }));
  }

  ngOnInit(): void {
    this.quotationForm = this.fb.group({
      from: '',
      to: '',
    })
  }

  onSubmit(form: FormGroup){

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



}
