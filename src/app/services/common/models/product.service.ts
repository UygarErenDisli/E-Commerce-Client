import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpclient.service';
import { CreateProduct } from '../../../contracts/create-product';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClint: HttpClientService) {}

  create(
    createProduct: CreateProduct,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClint
      .post(
        {
          controller: 'products',
        },
        createProduct
      )
      .subscribe({
        error: (errorResponse: HttpErrorResponse) => {
          const errors: Array<{ key: string; value: Array<string> }> =
            errorResponse.error;
          let output = '';
          errors.forEach((error) => {
            error.value.forEach((errorMessage) => {
              output += `${errorMessage}\n`;
            });
          });
          errorCallBack?.(output);
        },
        complete: () => successCallBack?.(),
      });
  }
}
