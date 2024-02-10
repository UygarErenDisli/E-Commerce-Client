import { Observable, firstValueFrom, throwError } from 'rxjs';
import { ListBasketItems } from '../../../contracts/basket/list-basket-items';
import { HttpClientService } from './../httpclient.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private httpClient: HttpClientService) {}

  async getbasketItems(): Promise<ListBasketItems[]> {
    const observable: Observable<ListBasketItems[]> = this.httpClient.get<
      ListBasketItems[]
    >({
      controller: 'baskets',
    });

    return await firstValueFrom(observable);
  }

  async addItemToBasket(
    productId: string,
    quantity: number,
    callBack?: () => void,
    errorCallBack?: (error: any) => void
  ) {
    const observable = this.httpClient.post(
      {
        controller: 'baskets',
      },
      { productId: productId, quantity: quantity }
    );

    const promise = firstValueFrom(observable);
    promise
      .then(() => callBack?.())
      .catch((errorMessage) => errorCallBack?.(errorMessage));
    await promise;
  }

  async updateItemQuantity(
    basketItemId: string,
    quantity: number,
    callBack?: () => void
  ) {
    const observable = this.httpClient.put(
      {
        controller: 'baskets',
      },
      {
        basketItemId: basketItemId,
        quantity: quantity,
      }
    );

    await firstValueFrom(observable);
    callBack?.();
  }

  async removeBasketItem(basketItemId: string) {
    const observable = this.httpClient.delete(
      {
        controller: 'baskets',
      },
      basketItemId
    );

    await firstValueFrom(observable);
  }
}
