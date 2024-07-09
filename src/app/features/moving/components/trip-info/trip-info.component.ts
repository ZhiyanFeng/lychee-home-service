import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from "@angular/material/stepper";
import {TranslateModule} from "@ngx-translate/core";
import {map, Observable, tap} from "rxjs";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MapDirectionsService} from "@angular/google-maps";
import {MovingDetailService} from "../../services/moving-detail-service/moving-detail.service";

@Component({
  selector: 'trip-info',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, MatStepperModule, TranslateModule, FormsModule, ReactiveFormsModule],
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.css']
})
export class TripInfoComponent implements OnInit{
  @Output() tripStepEvent = new EventEmitter<any>();
  @ViewChild('from') from: ElementRef;
  @ViewChild('to') to: ElementRef;

  isReady: Boolean = false;

  tripInfoForm: FormGroup;

  originalLocation: google.maps.places.Autocomplete | undefined;
  destinationLocation: google.maps.places.Autocomplete | undefined;
  directionResult: google.maps.DirectionsResult | undefined;
  directionsService = new google.maps.DirectionsService();

  constructor(private _formBuilder: FormBuilder, private mapDirectionsService: MapDirectionsService, private movingDetailService: MovingDetailService) {
  }
  ngOnInit(): void {
    this.isReady = true;
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

    this.directionsService.route(request,  (result, status) => {
      if (status === 'OK') {
        this.movingDetailService.directionsResults = result;
        this.movingDetailService.setTripInfo(result);
        this.tripStepEvent.emit('next');
      } else {
        //to implement
        console.log(status);
      }
    });
  }
}
