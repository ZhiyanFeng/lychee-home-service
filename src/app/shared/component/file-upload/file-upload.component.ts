import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FileUploadEvent, FileUploadHandlerEvent, FileUploadModule} from "primeng/fileupload";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {TranslateModule} from "@ngx-translate/core";
import {MovingDetailService} from "../../../features/moving/services/moving-detail-service/moving-detail.service";
import {MovingOrderService} from "../../../features/moving/services/moving-order-service/moving-order.service";

@Component({
  selector: 'app-file-upload',
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

  constructor(private storage: AngularFireStorage, private movingOrderService: MovingOrderService, private movingDetailService: MovingDetailService) {}

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

    this.movingOrderService.uploadMultipleFiles(this.uploadedFiles, this.filePath).then((results) => {
      results.forEach((result) => {
        result.subscribe((url) => {
          this.movingDetailService.downloadURLS.push(url);
        })
        // this.movingDetailService.downloadURLS = [...this.movingDetailService.downloadURLS,result];
    })
    }).catch(error => {
      console.error("File upload failed:", error);
    })
  }

  onNext() {
    this.uploadStepEvent.emit('next');
  }

}
