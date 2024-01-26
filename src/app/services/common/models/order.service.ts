import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpclient.service';
import { CreateOrder } from '../../../contracts/order/create-order';
import { Observable, firstValueFrom } from 'rxjs';
import { ListOrders } from '../../../contracts/order/list-order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httClient: HttpClientService) {}

  async getAllOrders(
    pageIndex: number,
    pageSize: number,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: any) => void
  ): Promise<ListOrders> {
    const observable: Observable<ListOrders> = this.httClient.get<ListOrders>({
      controller: 'orders',
      queryString: `pageIndex=${pageIndex}&pageSize=${pageSize}`,
    });

    const promiseData = firstValueFrom(observable);
    promiseData
      .then((_) => successCallBack?.())
      .catch((errorMessage) => errorCallBack?.(errorMessage));

    return await promiseData;
  }

  async completeShopping(order: CreateOrder): Promise<any> {
    const observable: Observable<any> = this.httClient.post(
      {
        controller: 'orders',
      },
      order
    );

    return await firstValueFrom(observable);
  }
}
