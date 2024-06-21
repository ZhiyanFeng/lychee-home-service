import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'app-image-popup',
  standalone: true,
  imports: [
    MatCard
  ],
  templateUrl: './image-popup.component.html',
  styleUrl: './image-popup.component.css'
})
export class ImagePopupComponent {
  imageUrl: string;

  constructor(public dialogRef: MatDialogRef<ImagePopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  closePopup() {
    this.dialogRef.close();
  }

}
