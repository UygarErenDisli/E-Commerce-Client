import { join } from 'node:path';
import { SpinnerType } from './../../base/spinner/spinner.component';
import { Component, Inject, OnInit, numberAttribute } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../services/common/models/product.service';
import { UpdateProduct } from '../../contracts/product/update-product';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../services/alerts/customtoastr.service';
@Component({
  selector: 'app-update-product-dialog',
  templateUrl: './update-product-dialog.component.html',
  styleUrl: './update-product-dialog.component.scss',
})
export class UpdateProductDialogComponent
  extends BaseDialog<UpdateProductDialogComponent>
  implements OnInit
{
  product: UpdateProduct | undefined;
  constructor(
    dialogRef: MatDialogRef<UpdateProductDialogComponent>,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private toastr: CustomToastrService,
    @Inject(MAT_DIALOG_DATA)
    public data: UpdateProduct
  ) {
    super(dialogRef);
  }
  async ngOnInit(): Promise<void> {
    try {
      this.spinner.show(SpinnerType.BallCLipRotate);
      this.product = await this.productService.getProductById(
        this.data.id!,
        () => {
          this.spinner.hide(SpinnerType.BallCLipRotate);
        }
      );
      debugger;
    } catch (error) {
      this.spinner.hide(SpinnerType.BallCLipRotate);
      this.toastr.message(
        'An unexpected error was encountered while getting the product',
        'Error!!',
        {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        }
      );
    }
  }
  saveProduct(
    newName: HTMLInputElement,
    newStock: HTMLInputElement,
    newPrice: HTMLInputElement
  ) {
    (this.product!.name = newName.value),
      (this.product!.stock = Number.parseInt(newStock.value));
    this.product!.price = Number.parseFloat(newPrice.value);

    this.spinner.show(SpinnerType.BallSpin);
    this.productService.updateProduct(
      this.product!,
      () => {
        this.spinner.hide(SpinnerType.BallSpin);
        this.toastr.message('Successfully Updated Product', 'Success', {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight,
        });
      },
      (errorMessage: string) => {
        this.spinner.hide(SpinnerType.BallSpin);
        this.toastr.message(errorMessage, 'Error', {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight,
        });
      }
    );
  }
}

export enum UpdateProductState {
  Close,
  Save,
}
