import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpclient.service';
import { CreateProduct } from '../../../contracts/create-product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClint: HttpClientService) {}

  create(createProduct: CreateProduct, successCallBack?: any) {
    this.httpClint
      .post(
        {
          controller: 'products',
        },
        createProduct
      )
      .subscribe(() => {
        successCallBack();
      });
  }
}
