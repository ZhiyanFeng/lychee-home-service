import {Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MapDirectionsService} from "@angular/google-maps";
import {SmallMovingDetail} from "../../models/small-moving-detail";


@Injectable({
  providedIn: 'root'
})
export class MovingDetailService{


  private _directionsResults: google.maps.DirectionsResult | undefined;
  private _tripForm: FormGroup;
  private _contactInfoForm: FormGroup;
  private _dateForm: FormGroup;
  private _downloadURLS: string[] = [];
  private _movingDetails = {} as SmallMovingDetail;

  constructor(private _fb: FormBuilder) {
    this._tripForm = this._fb.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      distance: ['', [Validators.required]],
      duration: ['', [Validators.required]],
    });

    this._contactInfoForm = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
    this._dateForm = this._fb.group({
      date: ['', [Validators.required]]
    });
  }

  setTripInfo(newTripInfo: google.maps.DirectionsResult){
    this._tripForm.value['from'] = newTripInfo.routes[0].legs[0].start_address;
    this._tripForm.value['to'] = newTripInfo.routes[0].legs[0].end_address;
    this._tripForm.value['distance'] = newTripInfo.routes[0].legs[0].distance.text;
    this._tripForm.value['duration'] = newTripInfo.routes[0].legs[0].duration.text;
  }

  updateContactInfo(contactInfoForm: FormGroup){
    this._contactInfoForm.value['firstName'] = contactInfoForm.value['firstName'];
    this._contactInfoForm.value['lastName'] = contactInfoForm.value['lastName'];
    this._contactInfoForm.value['email'] = contactInfoForm.value['email'];
    this._contactInfoForm.value['phone'] = contactInfoForm.value['phone'];
  }

  updateDateForm(dateForm: FormGroup){
    this._dateForm.value['date'] = dateForm.value['date'];
  }
  createMovingDateForm(fb: FormBuilder){
    return fb.group({
      date: ['', [Validators.required]]
    });
  }

  createContactForm(fb: FormBuilder){
    return fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
      }
    )
  }

  initDetails(){
    let trip = this.tripForm;
    this._movingDetails.from = trip.value['from'];
    this._movingDetails.to = trip.value['to'];
    this._movingDetails.distance = trip.value['distance'];
    this._movingDetails.duration = trip.value['duration'];
    this._movingDetails.shippingDate = this.dateForm.value['date'];
    this._movingDetails.shipment = this._downloadURLS;
  }

  get directionsResults(): google.maps.DirectionsResult | undefined {
    return this._directionsResults;
  }

  set directionsResults(value: google.maps.DirectionsResult | undefined) {
    this._directionsResults = value;
  }

  get tripForm(): FormGroup {
    return this._tripForm;
  }

  set tripForm(value: FormGroup) {
    this._tripForm = value;
  }

  get contactInfoForm(): FormGroup {
    return this._contactInfoForm;
  }

  set contactInfoForm(value: FormGroup) {
    this._contactInfoForm = value;
  }

  get dateForm(): FormGroup {
    return this._dateForm;
  }

  set dateForm(value: FormGroup) {
    this._dateForm = value;
  }

  get downloadURLS(): string[] {
    return this._downloadURLS;
  }

  set downloadURLS(value: string[]) {
    this._downloadURLS = value;
  }

  get movingDetails(): any {
    return this._movingDetails;
  }

  set movingDetails(value: any) {
    this._movingDetails = value;
  }
}
