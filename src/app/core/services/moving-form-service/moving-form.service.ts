import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MovingFormService {

  directionsResults: google.maps.DirectionsResult | undefined;

  constructor() { }
  addTripInfo(tripForm: FormGroup, newTripInfo: google.maps.DirectionsResult){
    this.directionsResults = newTripInfo;
    let trip = tripForm;
    trip.value['from'] = newTripInfo.routes[0].legs[0].start_address;
    trip.value['to'] = newTripInfo.routes[0].legs[0].end_address;
    trip.value['distance'] = newTripInfo.routes[0].legs[0].distance.text;
    trip.value['duration'] = newTripInfo.routes[0].legs[0].duration.text;
  }

  addContactInfo(contactForm: FormGroup, contactInfoForm: FormGroup){
    let contact = contactForm;
    contact.value['firstName'] = contactInfoForm.value['firstName'];
    contact.value['lastName'] = contactInfoForm.value['lastName'];
    contact.value['email'] = contactInfoForm.value['email'];
    contact.value['phone'] = contactInfoForm.value['phone'];
  }
}
