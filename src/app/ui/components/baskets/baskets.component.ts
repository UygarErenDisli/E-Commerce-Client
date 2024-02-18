import { NgxSpinnerService } from 'ngx-spinner';
import {
  SpinnerComponent,
  SpinnerType,
} from '../../../base/spinner/spinner.component';
import { BasketService } from './../../../services/common/models/basket.service';
import { Component, OnInit } from '@angular/core';
import { ListBasketItems } from '../../../contracts/basket/list-basket-items';
import { DialogService } from '../../../services/common/dialog.service';

import {
  DeleteBasketItemDialogComponent,
  DeleteBasketItemDialogState,
} from '../../../dialogs/delete-basket-item-dialog/delete-basket-item-dialog.component';
import { CheckoutDialogComponent } from '../../../dialogs/checkout-dialog/checkout-dialog.component';

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
  hasItemInBasket!: boolean;

  constructor(
    spinner: NgxSpinnerService,
    private basketService: BasketService,
    private dialogService: DialogService
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
    this.hasItemInBasket = this.basketItems.length > 0 ? true : false;
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
    $('#basketModal').modal('hide');
    this.dialogService.openDialog({
      component: CheckoutDialogComponent,
      data: {
        basketItems: this.basketItems,
        totalItems: this.totalItems,
        totalPrice: this.totalPrice,
      },
      options: {
        width: '1440px',
      },
    });
  }
}
