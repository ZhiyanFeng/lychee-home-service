import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FileUploadEvent, FileUploadHandlerEvent, FileUploadModule} from "primeng/fileupload";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {TranslateModule} from "@ngx-translate/core";
import {MovingDetailService} from "../../../features/moving/services/moving-detail-service/moving-detail.service";
import {MovingOrderService} from "../../../features/moving/services/moving-order-service/moving-order.service";
import {Store} from "@ngrx/store";
import {PayloadActions} from "../../../core/store/payload/payload.actions";
import {Payload} from "../../../features/moving/models/payload";

@Component({
  selector: 'app-payload-upload',
  standalone: true,
  imports: [
    FileUploadModule,
    NgIf,
    NgForOf,
    MatButton,
    MatStepperNext,
    MatStepperPrevious,
    TranslateModule
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent implements OnInit{
  @Input() filePath: string;
  @Output() uploadStepEvent = new EventEmitter<any>();

  uploadedFiles:  Set<File>;
  payload: Payload;

  constructor(private storage: AngularFireStorage, private movingDetailService: MovingDetailService, private store: Store) {}

  ngOnInit() {
    this.uploadedFiles = new Set();
  }

  onUpload($event: FileUploadHandlerEvent) {
    for(let file of $event.files) {
      if(!this.uploadedFiles.has(file)){
        this.uploadedFiles.add(file);
      }
      continue;
    }
    this.uploadedFiles.forEach(file=> {
      let phone = this.movingDetailService.contactInfoForm.get('phone').value;
      this.store.dispatch(PayloadActions.uploadPayload({phone: phone, file: file}));
    })
  }

  onNext() {
    this.uploadStepEvent.emit('next');
  }

}
