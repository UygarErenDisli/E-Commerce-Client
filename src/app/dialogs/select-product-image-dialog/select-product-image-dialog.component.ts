import { ListProductDetails } from './../../admin/components/products/list/list.component';
import { SpinnerType } from './../../base/spinner/spinner.component';
import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';
import { ProductService } from '../../services/common/models/product.service';
import { ListProductImage } from '../../contracts/list-product-images';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogService } from '../../services/common/dialog.service';
import {
  DeleteDialogComponent,
  DeleteState,
} from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrl: './select-product-image-dialog.component.scss',
})
export class SelectProductImageDialogComponent
  extends BaseDialog<SelectProductImageDialogComponent>
  implements OnInit
{
  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA)
    public data: ListProductDetails
  ) {
    super(dialogRef);
  }
  images: ListProductImage[] | undefined;
  currentProduct: ListProductDetails | undefined;

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: 'upload',
    controller: 'products',
    explanation: 'Select product photos',
    acceptedType: '.png, .jpg, .jpeg, .gif',
    queryString: `id=${this.data.productId}`,
  };

  async ngOnInit(): Promise<void> {
    this.currentProduct = this.data;
    this.spinner.show(SpinnerType.BallScaleMultiple);
    this.images = await this.productService.readImages(
      this.data.productId,
      () => {
        this.spinner.hide(SpinnerType.BallScaleMultiple);
      }
    );
  }

  deleteImage(imageId: string, event: any) {
    this.dialogService.openDialog({
      component: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: () => {
        this.spinner.show(SpinnerType.BallScaleMultiple);
        this.productService.deleteImage(this.data.productId, imageId, () => {
          this.spinner.hide(SpinnerType.BallScaleMultiple);
          var currentCard = $(event.srcElement).parent().parent();
          currentCard.fadeOut(500);
        });
      },
    });
  }
}

export enum SelectProductImageState {
  Close,
}
