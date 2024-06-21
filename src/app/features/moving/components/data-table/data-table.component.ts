import {Component, Input, OnInit} from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import {Button, ButtonModule} from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import {FormGroup, FormsModule} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import {MovingOrderService} from "../../services/moving-order-service/moving-order.service";
import {MovingDetailService} from "../../services/moving-detail-service/moving-detail.service";
import {SmallMovingDetail} from "../../models/small-moving-detail";
import {ImagePopupComponent} from "../../../../shared/component/image-popup/image-popup.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule,
            InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule,
            RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule],
  providers: [MessageService, ConfirmationService, MovingOrderService],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent implements OnInit{
  @Input() detail: SmallMovingDetail;
  productDialog: boolean = false;

  products!: string[];

  product!: string;

  selectedProducts!: string[] | null;

  submitted: boolean = false;

  statuses!: any[];

  constructor(private movingDetailService: MovingDetailService, private messageService: MessageService,
              private confirmationService: ConfirmationService, private dialog: MatDialog) {}

  ngOnInit() {
  }
  ngOnChanges() {
    this.products = this.detail.shipment;
  }
  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
        this.selectedProducts = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  editProduct(product: string) {
    // this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: string) {
    this.confirmationService.confirm({
      // message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.products = this.products.filter((val) => val.id !== product.id);
        // this.product = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  openImagePopup(imageUrl: string) {
    const data = { imageUrl: imageUrl };
    this.dialog.open(ImagePopupComponent, { data });
  }

  saveProduct() {
    this.submitted = true;
    //
    // if (this.product.name?.trim()) {
    //   if (this.product.id) {
    //     this.products[this.findIndexById(this.product.id)] = this.product;
    //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    //   } else {
    //     this.product.id = this.createId();
    //     this.product.image = 'product-placeholder.svg';
    //     this.products.push(this.product);
    //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //   }
    //
    //   this.products = [...this.products];
    //   this.productDialog = false;
    //   this.product = {};
    // }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      // if (this.products[i].id === id) {
      //   index = i;
      //   break;
      // }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  // getSeverity(status: string) {
  //   switch (status) {
  //     case 'INSTOCK':
  //       return 'success';
  //     case 'LOWSTOCK':
  //       return 'warning';
  //     case 'OUTOFSTOCK':
  //       return 'danger';
  //   }
  // }
}
