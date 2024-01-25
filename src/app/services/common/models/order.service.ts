import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpclient.service';
import { CreateOrder } from '../../../contracts/order/create-order';
import { Observable, first, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httClient: HttpClientService) {}

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
