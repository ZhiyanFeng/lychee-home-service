import {Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SmallMovingDetail} from "../../models/small-moving-detail";
import {Store} from "@ngrx/store";
import {MovingOrder} from "../../models/moving-order";

@Injectable({
  providedIn: 'root'
})
export class MovingOrderService implements OnInit {
  private _directionsResults: google.maps.DirectionsResult | undefined;
  private _tripForm: FormGroup;
  private _contactInfoForm: FormGroup;
  private _movingDetails = {} as SmallMovingDetail;
  private order: MovingOrder;
  // Regular expression for North American phone numbers (US and Canada)
  private _phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;


  constructor(private _fb: FormBuilder, private store: Store) {
    this._tripForm = this._fb.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      distance: ['', [Validators.required]],
      duration: ['', [Validators.required]],
    });

    this._contactInfoForm = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(this._phoneRegex)]],
    });

    this.order = {
      id: '',
      type: '',
      status: '',
      trip: {
        from: '',
        to: '',
        distance: '',
        duration: ''
      },
      movingDate: null,
      contact: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      },
      property: {
        residentialType: '',
        rooms: ''
      },
      bulkyItems: {
        piano: '',
        marbleFurniture: '',
        refrigerator: ''
      },
      payload: []
    }
  }

  ngOnInit(): void {
  }

  setTripInfo(newTripInfo: google.maps.DirectionsResult) {
    this.order.trip['from'] = newTripInfo.routes[0].legs[0].start_address;
    this.order.trip['to'] = newTripInfo.routes[0].legs[0].end_address;
    this.order.trip['distance'] = newTripInfo.routes[0].legs[0].distance.text;
    this.order.trip['duration'] = newTripInfo.routes[0].legs[0].duration.text;
  }

  updatePropertyInfo(propertyForm: FormGroup) {
    this.order.property = propertyForm.value;
  }

  updateContactInfo(contactInfoForm: FormGroup) {
    this.order.contact = contactInfoForm.value;
  }

  updateDateForm(dateForm: FormGroup) {
    this.order.movingDate = dateForm.value['date'];
  }

  createMovingDateForm(fb: FormBuilder) {
    return fb.group({
      date: ['', [Validators.required]]
    });
  }

  createBulkItemsForm() {
    return this._fb.group({
      piano: ['', [Validators.required]],
      marbleFurniture: ['', [Validators.required]],
      refrigerator: ['', [Validators.required]]
    });
  }

  createPropertyForm() {
    return this._fb.group({
      residentialType: ['', [Validators.required]],
      rooms: ['', [Validators.required]]
    });
  }

  updateBulkyItems(bulkyItemsForm: FormGroup) {
    this.order.bulkyItems = bulkyItemsForm.value;
  }
  createContactForm(fb: FormBuilder) {
    return fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
      }
    )
  }
  get movingOrder(): MovingOrder {
    return this.order;
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
  get contactInfoForm(): FormGroup {
    return this._contactInfoForm;
  }
  get movingDetails(): any {
    return this._movingDetails;
  }
}
