import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  SpinnerComponent,
  SpinnerType,
} from '../../../../base/spinner/spinner.component';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../../../services/alerts/customtoastr.service';
import { DialogService } from '../../../../services/common/dialog.service';
import { OrderService } from '../../../../services/common/models/order.service';
import { ListOrder, ListOrders } from '../../../../contracts/order/list-order';
import { DetailedOrderDialogComponent } from '../../../../dialogs/detailed-order-dialog/detailed-order-dialog.component';
import {
  CancelOrderDialogComponent,
  CancelOrderDialogState,
} from '../../../../dialogs/cancel-order-dialog/cancel-order-dialog.component';
import { CancelOrder } from '../../../../entities/order/cancel-order';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent extends SpinnerComponent {
  displayedColumns: string[] = [
    'orderCode',
    'username',
    'userEmail',
    'totalPrice',
    'createdDate',
    'isCompleted',
    'detail',
    'cancelOrder',
  ];
  dataSource: MatTableDataSource<ListOrder> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    spinner: NgxSpinnerService,
    private toastrAlert: CustomToastrService,
    private dialogSerivce: DialogService,
    private orderService: OrderService
  ) {
    super(spinner);
  }

  async getOrders() {
    this.showSpinner(SpinnerType.BallSpin);
    const listOrdes: ListOrders = await this.orderService.getAllOrders(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => {
        this.hideSpinner(SpinnerType.BallSpin);
      },
      (errorMessage) => {
        this.toastrAlert.message(
          'An unexpected error was encountered while getting the orders',
          'Error!!',
          {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopRight,
          }
        );
      }
    );
    this.dataSource = new MatTableDataSource<ListOrder>(listOrdes?.orders);
    this.paginator!.length = listOrdes?.totalCount;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openOrderDetail(orderId: string) {
    this.dialogSerivce.openDialog({
      component: DetailedOrderDialogComponent,
      data: orderId,
      options: {
        width: '1440px',
      },
    });
  }

  openCancelOderDialog(
    orderId: string,
    orderCode: string,
    userName: string,
    userEmail: string,
    totalPrice: number,
    createdDate: Date
  ) {
    this.dialogSerivce.openDialog({
      component: CancelOrderDialogComponent,
      data: new CancelOrder(
        orderId,
        orderCode,
        userName,
        userEmail,
        totalPrice,
        createdDate
      ),
      afterClosed: async () => {
        await this.getOrders();
      },
    });
  }

  async pageChanged() {
    await this.getOrders();
  }
  async ngOnInit(): Promise<void> {
    await this.getOrders();
  }
}
