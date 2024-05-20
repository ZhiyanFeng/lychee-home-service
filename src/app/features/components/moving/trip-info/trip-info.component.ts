import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from "@angular/material/stepper";
import {TranslateModule} from "@ngx-translate/core";
import {map, Observable, tap} from "rxjs";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MapDirectionsService} from "@angular/google-maps";

@Component({
  selector: 'trip-info',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, MatStepperModule, TranslateModule, FormsModule, ReactiveFormsModule],
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.css']
})
export class TripInfoComponent implements OnInit{
  @Output() newTripInfoEvent = new EventEmitter<any>();
  @ViewChild('from') from: ElementRef;
  @ViewChild('to') to: ElementRef;

  tripInfoForm: FormGroup;

  originalLocation: google.maps.places.Autocomplete | undefined;
  destinationLocation: google.maps.places.Autocomplete | undefined;
  directionResult: google.maps.DirectionsResult | undefined;



  directionsService = new google.maps.DirectionsService();

  constructor(private _formBuilder: FormBuilder, private mapDirectionsService: MapDirectionsService) {
  }
  ngOnInit(): void {
    this.tripInfoForm = this._formBuilder.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]]
    })
  }

  ngAfterViewInit(): void {
    this.originalLocation = new google.maps.places.Autocomplete(this.from.nativeElement);
    this.destinationLocation = new google.maps.places.Autocomplete(this.to.nativeElement);
  }

  calcRoute(){
    let _this = this;
    this.tripInfoForm.value['from'] = this.originalLocation.getPlace().formatted_address;
    this.tripInfoForm.value['to'] = this.destinationLocation.getPlace().formatted_address;

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

    this.directionsService.route(request, function(result, status) {
      if (status === 'OK') {
        _this.newTripInfoEvent.emit(result);
      }else {
        //to implement
        console.log(status);
      }
    });
  }
}
