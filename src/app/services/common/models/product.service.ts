import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpclient.service';
import { CreateProduct } from '../../../contracts/create-product';
import { HttpErrorResponse } from '@angular/common/http';
import { ListProducts } from '../../../contracts/list-products';
import { Observable, firstValueFrom } from 'rxjs';
import { ListProductImage } from '../../../contracts/list-product-images';

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

  async read(
    pageIndex: number = 0,
    pageSize: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<ListProducts | undefined> {
    const listProducts: Promise<ListProducts | undefined> = this.httpClint
      .get<ListProducts>({
        controller: 'products',
        queryString: `pageIndex=${pageIndex}&pageSize=${pageSize}`,
      })
      .toPromise();

    listProducts
      .then(() => successCallBack?.())
      .catch((errorMessage: HttpErrorResponse) =>
        errorCallBack?.(errorMessage.message)
      );
    return (await listProducts) ? listProducts : undefined;
  }

  async readImages(id: string, successCallBack?: () => void) {
    const imagesObservable: Observable<ListProductImage[]> = this.httpClint.get<
      ListProductImage[]
    >(
      {
        controller: 'products',
        action: 'GetProductImages',
      },
      id
    );
    const images = await firstValueFrom(imagesObservable);
    successCallBack?.();
    return images;
  }

  async deleteImage(
    productId: string,
    imageId: string,
    successCallBack?: () => void
  ) {
    await firstValueFrom(
      this.httpClint.delete(
        {
          controller: 'products',
          action: 'DeleteProductImage',
          queryString: `imageId=${imageId}`,
        },
        productId
      )
    );
    successCallBack?.();
  }
}
