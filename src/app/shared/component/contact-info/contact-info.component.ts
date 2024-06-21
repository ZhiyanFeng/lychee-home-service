import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from "@angular/material/stepper";
import {MovingDetailService} from "../../../features/moving/services/moving-detail-service/moving-detail.service";

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, TranslateModule, MatButtonModule, MatStepperModule],
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit{
  @Output() contactStepEvent = new EventEmitter<any>();
  contactInfoFrom: FormGroup;
  isReady = false;

  constructor(private _formBuilder: FormBuilder, private movingDetailService: MovingDetailService) {

  }

  ngOnInit(): void {
    this.isReady = true;
    this.contactInfoFrom = this.movingDetailService.contactInfoForm
  }

  updateContactInfo(){
    this.movingDetailService.updateContactInfo(this.contactInfoFrom);
    this.contactStepEvent.emit('next');
  }



}
