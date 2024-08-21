import {AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactInfoComponent} from "../../../../shared/component/contact-info/contact-info.component";
import {GoogleMapsModule, MapDirectionsService} from "@angular/google-maps";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatStepper, MatStepperModule, StepperOrientation} from "@angular/material/stepper";
import {OrderDetailComponent} from "../order-detail/order-detail.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {TripInfoComponent} from "../trip-info/trip-info.component";
import {Router} from "@angular/router";
import {ResponsiveDesignService} from "../../../../core/services/responsive-design/responsive-design.service";
import {MovingOrderService} from "../../services/moving-order-service/moving-order.service";
import {MovingOrder} from "../../models/moving-order";
import {FileUploadComponent} from "../../../../shared/component/file-upload/file-upload.component";
import {select, Store} from "@ngrx/store";
import {MovingType} from "../../enums/moving-type";
import {MovingOrderActions} from "../../../../core/store/moving-order/moving-order.actions";
import {SCREEN_SIZE} from "../../../../shared/enums/screen-size";
import {setOrientation} from "../../../../../util/helper";
import {selectPayloadById} from "../../../../core/store/payload/payload.selectors";

@Component({
  selector: 'app-small-moving',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, GoogleMapsModule, ReactiveFormsModule,
    MatStepperModule, MatSelectModule, MatButtonModule, OrderDetailComponent, MatDatepickerModule,
    MatNativeDateModule, TranslateModule, TripInfoComponent, ContactInfoComponent, FileUploadComponent],
  templateUrl: './small-moving.component.html',
  styleUrls: ['./small-moving.component.css']
})

export class SmallMovingComponent implements OnInit, AfterViewInit{
  @ViewChild('tripInfoComponent') tripInfoComponent: TripInfoComponent;
  @ViewChild('contactInfoComponent') contactInfoComponent: ContactInfoComponent;
  @ViewChild('picker') datePicker: MatDatepicker<Date>;
  @ViewChild('stepper') stepper: MatStepper;


  order: MovingOrder;
  tripInfoForm: FormGroup;
  movingDateForm: FormGroup;
  contactInfoForm: FormGroup;
  movingType = MovingType.Small;
  formUpdated: boolean = false;

  directionsResults: google.maps.DirectionsResult;
  orientation: StepperOrientation = 'vertical';
  isLinear = true;
  uploadFilePath = '/small-moving/';
  downloadURLs: string[] = [];

  center: google.maps.LatLngLiteral = {lat: 43.651070, lng: -79.347015};
  zoom = 4;

  constructor(private _formBuilder: FormBuilder, private store: Store,
              private router: Router, private rwd: ResponsiveDesignService,
              private movingOrderService: MovingOrderService, private cd: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.movingDateForm = this.movingOrderService.createMovingDateForm(this._formBuilder);
    this.contactInfoForm = this.movingOrderService.createContactForm(this._formBuilder);

    this.movingOrderService.order$.subscribe(order => {
      this.order = order;
    })
    this.orientation = setOrientation(this.rwd.defaultSize);
    this.rwd.onResize$.subscribe(size => {
      this.orientation = setOrientation(size);
    });
  }
  ngAfterViewInit(){
    if(this.tripInfoComponent.isReady){
      this.tripInfoForm = this.tripInfoComponent.tripInfoForm;
    }
    if(this.contactInfoComponent.isReady){
      this.contactInfoForm = this.contactInfoComponent.contactInfoFrom;
    }
    this.cd.detectChanges();
  }


  updateTripInfo(event: any){
    if(event === 'next'){
      this.directionsResults = this.movingOrderService.directionsResults;
    }
  }

  addContactInfo(event: any){
    this.movingOrderService.updateContactInfo(this.contactInfoForm);
    this.stepper.next();
  }

  updateUploadPath(){
    this.uploadFilePath += this.movingOrderService.contactInfoForm.value['phone'] + '/';
  }
  onDatePick(){
    this.movingOrderService.updateDateForm(this.movingDateForm);
  }

  uploadFileComplete(event: any){
    this.store.pipe(select(selectPayloadById({id: event}))).subscribe(
      payloads => {
        this.downloadURLs = payloads;
        this.order['payloads'] = this.downloadURLs;
      });
    this.stepper.next();
  }

  onSubmit(){
    this.order["id"] = this.order['contact'].phone + '-' + new Date().toISOString().slice(0, 10);
    this.order['type'] = MovingType.Small;
    debugger;
    this.store.dispatch(MovingOrderActions.saveMovingOrder({movingOrder: this.order}));
  }

}
