import { NgxSpinnerService } from 'ngx-spinner';
import {
  SpinnerComponent,
  SpinnerType,
} from '../../../base/spinner/spinner.component';
import { BasketService } from './../../../services/common/models/basket.service';
import { Component, OnInit } from '@angular/core';
import { ListBasketItems } from '../../../contracts/basket/list-basket-items';
import { OrderService } from '../../../services/common/models/order.service';
import { CreateOrder } from '../../../contracts/order/create-order';
import { DialogService } from '../../../services/common/dialog.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../../services/alerts/customtoastr.service';
import {
  DeleteBasketItemDialogComponent,
  DeleteBasketItemDialogState,
} from '../../../dialogs/delete-basket-item-dialog/delete-basket-item-dialog.component';
import {
  CompleteShoppingDialogComponent,
  CompleteShoppingState,
} from '../../../dialogs/complete-shopping-dialog/complete-shopping-dialog.component';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrl: './baskets.component.scss',
})
export class BasketsComponent extends SpinnerComponent implements OnInit {
  basketItems?: ListBasketItems[];
  totalItems?: number;
  totalPrice?: number;

  constructor(
    spinner: NgxSpinnerService,
    private basketService: BasketService,
    private orderService: OrderService,
    private dialogService: DialogService,
    private toastr: CustomToastrService,
    private router: Router
  ) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    this.showSpinner(SpinnerType.BallCLipRotate);
    await this.calculateSummary();
    this.hideSpinner(SpinnerType.BallCLipRotate);
  }

  private async calculateSummary() {
    this.basketItems = await this.basketService.getbasketItems();
    this.totalItems = this.basketItems?.length;
    this.totalPrice = this.basketItems?.reduce(
      (sum, item) => (sum += item.price * item.quantity),
      0
    );
  }

  async updateQuantity(object: any, basketItemId: string) {
    this.showSpinner(SpinnerType.BallCLipRotate);
    const quantity: number = object.target.value;
    await this.basketService.updateItemQuantity(basketItemId, quantity);
    await this.calculateSummary();
    this.hideSpinner(SpinnerType.BallCLipRotate);
  }

  async removeBasketItem(basketItemId: string) {
    this.dialogService.openDialog({
      component: DeleteBasketItemDialogComponent,
      data: DeleteBasketItemDialogState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.BallCLipRotate);
        await this.basketService.removeBasketItem(basketItemId);
        $('.' + basketItemId).fadeOut(1000, async () => {
          await this.calculateSummary();
        });
        this.hideSpinner(SpinnerType.BallCLipRotate);
      },
    });
  }

  async completeShopping() {
    this.dialogService.openDialog({
      component: CompleteShoppingDialogComponent,
      data: CompleteShoppingState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.BallCLipRotate);
        let createOrderTest = new CreateOrder();
        createOrderTest.City = 'Istanbul';
        createOrderTest.Country = 'Turkey';
        createOrderTest.State = 'Turkey';
        createOrderTest.Street = 'Test Street';
        createOrderTest.ZipCode = '34100';
        createOrderTest.Description = 'This is a test order';
        await this.orderService.completeShopping(createOrderTest);
        $('#basketModal').modal('hide');
        this.router.navigate(['/']);
        this.toastr.message('Successfully created an order', 'Order Created', {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopCenter,
        });
        this.hideSpinner(SpinnerType.BallCLipRotate);
      },
    });
  }
}
