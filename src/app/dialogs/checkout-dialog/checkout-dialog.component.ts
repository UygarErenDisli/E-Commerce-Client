import { CreateOrderAddress } from './../../entities/create-order-address';
import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../../services/common/dialog.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ListBasketItems } from '../../contracts/basket/list-basket-items';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from '../../services/common/models/order.service';
import { Router } from '@angular/router';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../services/alerts/customtoastr.service';
import { CheckoutDetails } from '../../entities/order-checkout-details';

declare var $: any;

@Component({
  selector: 'app-checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  styleUrl: './checkout-dialog.component.scss',
})
export class CheckoutDialogComponent
  extends BaseDialog<CheckoutDialogComponent>
  implements OnInit
{
  displayedColumns: string[] = [
    'index',
    'productName',
    'price',
    'quantity',
    'totalPrice',
  ];
  dataSource: MatTableDataSource<ListBasketItems> = new MatTableDataSource();

  totalPrice?: number;
  totalItems!: number;
  orderAddress?: CreateOrderAddress = new CreateOrderAddress();
  IsWatting: boolean = true;
  submitMessage: string = '';

  addressFormGroup = this.formBuilder.group({
    city: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(60)],
    ],
    country: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(60)],
    ],
    state: ['', [Validators.required, Validators.maxLength(60)]],
    street: ['', [Validators.required, Validators.maxLength(60)]],
    zipCode: ['', [Validators.required, Validators.maxLength(60)]],
    description: ['', Validators.maxLength(200)],
  });

  constructor(
    dialogRef: MatDialogRef<CheckoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CheckoutDetails,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private orderService: OrderService,
    private router: Router,
    private toastr: CustomToastrService
  ) {
    super(dialogRef);
  }
  ngOnInit(): void {
    this.totalPrice = this.data.totalPrice;
    this.totalItems = this.data.totalItems;
    this.dataSource = new MatTableDataSource<ListBasketItems>(
      this.data.basketItems
    );
  }

  backToBasket() {
    this.dialogService.closeAllDialogs();
    $('#basketModal').modal('show');
  }

  getAddressInfo(
    city: string,
    country: string,
    description: string,
    state: string,
    street: string,
    zipCode: string
  ) {
    this.orderAddress!.city = city;
    this.orderAddress!.country = country;
    this.orderAddress!.description = description;
    this.orderAddress!.state = state;
    this.orderAddress!.street = street;
    this.orderAddress!.zipCode = zipCode;
  }

  async checkOutComplete() {
    await this.orderService.completeShopping(
      {
        City: this.orderAddress!.city,
        Country: this.orderAddress!.country,
        State: this.orderAddress!.state,
        Street: this.orderAddress!.street,
        ZipCode: this.orderAddress!.zipCode,
        Description: this.orderAddress?.description,
      },
      () => {
        this.IsWatting = false;
        this.submitMessage = 'Everthing is done!!';
        setTimeout(() => {
          this.dialogService.closeAllDialogs();
          this.router.navigate(['/']);
          this.toastr.message('Successfully created an order', 'Success', {
            messageType: ToastrMessageType.Success,
            position: ToastrPosition.TopCenter,
          });
        }, 3000);
      },
      (errorMessage) => {
        this.IsWatting = false;
        this.submitMessage =
          ' An Error occured while processing your order ! Please Try Again Later!';
        setTimeout(() => {
          this.dialogService.closeAllDialogs();
          this.router.navigate(['/']);
        }, 3000);
      }
    );
  }
}

export enum CheckoutDialogState {
  Yes,
  No,
}
