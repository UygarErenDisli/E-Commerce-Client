import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from '../../services/common/models/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/spinner/spinner.component';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../services/alerts/customtoastr.service';
import {
  DetailedOrder,
  OrderBasketItems,
} from '../../contracts/order/single-detailed-order';
import { DialogService } from '../../services/common/dialog.service';
import {
  CompleteOrderDialogComponent,
  CompleteOrderDialogState,
} from '../complete-order-dialog/complete-order-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detailed-order-dialog',
  templateUrl: './detailed-order-dialog.component.html',
  styleUrl: './detailed-order-dialog.component.scss',
})
export class DetailedOrderDialogComponent
  extends BaseDialog<DetailedOrderDialogComponent>
  implements OnInit
{
  displayedColumns: string[] = [
    'productName',
    'price',
    'quantity',
    'totalPrice',
  ];
  dataSource: MatTableDataSource<OrderBasketItems> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  detailedOrder!: DetailedOrder;
  formatedOrderDate!: string;
  formatedOrderTime!: string;

  constructor(
    dialogRef: MatDialogRef<DetailedOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DetailedOrderDialogState | string,
    private orderService: OrderService,
    private spinner: NgxSpinnerService,
    private toastr: CustomToastrService,
    private dialogService: DialogService,
    private router: Router
  ) {
    super(dialogRef);
  }
  async ngOnInit(): Promise<void> {
    this.spinner.show(SpinnerType.BallSpin);
    const detailedOrder = await this.orderService.getOrderById(
      this.data as string,
      () => {
        this.spinner.hide(SpinnerType.BallSpin);
      },
      (_) => {
        this.toastr.message(
          'An unexpected error was encountered while getting the orders',
          'Error!!',
          {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopRight,
          }
        );
      }
    );

    this.detailedOrder = detailedOrder;
    this.formatOrderDate();
    this.dataSource = new MatTableDataSource<OrderBasketItems>(
      detailedOrder?.basketItems
    );
    this.paginator!.length = detailedOrder.basketItems.length;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private formatOrderDate() {
    const orderDate = this.detailedOrder.createdDate
      .toString()
      .substring(0, this.detailedOrder.createdDate.toString().indexOf('T'));
    const orderDates = orderDate.split('-');
    const orderTimes = this.detailedOrder.createdDate
      .toString()
      .substring(
        this.detailedOrder.createdDate.toString().indexOf('T') + 1,
        this.detailedOrder.createdDate.toString().indexOf('.')
      )
      .split(':');

    this.formatedOrderDate = `${orderDates[2]}/${orderDates[1]}/${orderDates[0]}`;
    this.formatedOrderTime = `${orderTimes[0]}:${orderTimes[1]}`;
  }

  completeOrder() {
    this.dialogService.openDialog({
      component: CompleteOrderDialogComponent,
      data: CompleteOrderDialogState.Yes,
      afterClosed: () => {
        this.spinner.show(SpinnerType.BallSpin);
        this.orderService.completeOrder(this.data as string, () => {
          this.dialogRef.close();
          const url = this.router.url;
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([url]);
            });
          this.spinner.hide(SpinnerType.BallSpin);
          this.toastr.message('Order Marked as Completed', 'Success', {
            messageType: ToastrMessageType.Success,
            position: ToastrPosition.TopCenter,
          });
        });
      },
    });
  }
}

export enum DetailedOrderDialogState {
  Yes,
  No,
}
