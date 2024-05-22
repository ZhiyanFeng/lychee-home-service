import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from "@angular/material/stepper";

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, TranslateModule, MatButtonModule, MatStepperModule],
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit{
  @Output() contactInfoEvent = new EventEmitter<any>();
  contactInfoFrom: FormGroup;

  constructor(private _formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.contactInfoFrom = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]]
    })
  }

  addContactInfo(){
    this.contactInfoEvent.emit(this.contactInfoFrom);
  }



}
