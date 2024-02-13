import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../services/alerts/customtoastr.service';
import { BaseDialog } from '../base/base-dialog';
import { OrderService } from '../../services/common/models/order.service';
import { CancelOrder } from '../../entities/order/cancel-order';
import { SpinnerType } from '../../base/spinner/spinner.component';

@Component({
  selector: 'app-cancel-order-dialog',
  templateUrl: './cancel-order-dialog.component.html',
  styleUrl: './cancel-order-dialog.component.scss',
})
export class CancelOrderDialogComponent
  extends BaseDialog<CancelOrderDialogComponent>
  implements OnInit
{
  constructor(
    dialogRef: MatDialogRef<CancelOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CancelOrder,
    private toastr: CustomToastrService,
    private spinner: NgxSpinnerService,
    private orderService: OrderService
  ) {
    super(dialogRef);
  }

  currentOrder!: CancelOrder;

  ngOnInit(): void {
    this.currentOrder = this.data;
  }

  async cancelOrder(reason: string) {
    this.spinner.show(SpinnerType.BallCLipRotate);
    await this.orderService.cancelOrder(
      this.data.id,
      reason,
      () => {
        this.spinner.hide(SpinnerType.BallCLipRotate);
        this.toastr.message('Successfully cancel order', 'Success', {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopCenter,
        });
      },
      () => {
        this.spinner.hide(SpinnerType.BallCLipRotate);
        this.toastr.message(
          'An Error occured while canceling order!',
          'Error',
          {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopCenter,
          }
        );
      }
    );
  }
}

export enum CancelOrderDialogState {
  Close,
}
