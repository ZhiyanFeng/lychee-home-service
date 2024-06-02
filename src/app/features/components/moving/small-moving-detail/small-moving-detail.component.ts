import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactInfoComponent} from "../../../../shared/component/contact-info/contact-info.component";
import {GoogleMapsModule, MapDirectionsService} from "@angular/google-maps";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatStepperModule} from "@angular/material/stepper";
import {MovingServiceSummaryComponent} from "../moving-service-summary/moving-service-summary.component";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {TripInfoComponent} from "../trip-info/trip-info.component";
import {FirestoreService} from "../../../../core/services/firestore-service/firestore.service";
import {Router} from "@angular/router";
import {ResponsiveDesignService} from "../../../../core/services/responsive-design/responsive-design.service";
import {MovingFormService} from "../../../../core/services/moving-form-service/moving-form.service";

@Component({
  selector: 'app-small-moving-detail',
  standalone: true,
    imports: [CommonModule, ContactInfoComponent, GoogleMapsModule, MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatStepperModule, MovingServiceSummaryComponent, ReactiveFormsModule, TranslateModule, TripInfoComponent],
  templateUrl: './small-moving-detail.component.html',
  styleUrls: ['./small-moving-detail.component.css']
})

export class SmallMovingDetailComponent {
  constructor(private _formBuilder: FormBuilder, private mapDirectionsService: MapDirectionsService,
              private firestoreSevice: FirestoreService, private router: Router, private rwd: ResponsiveDesignService,
              private movingFormService: MovingFormService) {
  }

}
