import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpclient.service';
import { CreateProduct } from '../../../contracts/product/create-product';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { ListProducts } from '../../../contracts/product/list-products';
import { Observable, firstValueFrom } from 'rxjs';
import { ListProductImage } from '../../../contracts/product-images/list-product-images';
import { UpdateProduct } from '../../../contracts/product/update-product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClint: HttpClientService) {}

  async create(
    createProduct: CreateProduct,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    const observable: Observable<any> = this.httpClint.post(
      {
        controller: 'products',
      },
      createProduct
    );
    const promise = firstValueFrom(observable);
    promise
      .then(() => successCallBack?.())
      .catch((errorResponse) => {
        errorCallBack?.(errorResponse);
      });
    await promise;
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

  async getProductById(productId: string, successCallBack?: () => void) {
    const productObservable: Observable<UpdateProduct> =
      this.httpClint.get<UpdateProduct>(
        {
          controller: 'products',
        },
        productId
      );
    var product = await firstValueFrom(productObservable);
    product.id = productId;
    successCallBack?.();
    return product;
  }

  async updateProduct(
    updateProduct: UpdateProduct,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    const observable = this.httpClint.put(
      {
        controller: 'products',
      },
      updateProduct
    );

    const promise = firstValueFrom(observable);
    promise
      .then((_) => {
        successCallBack?.();
      })
      .catch((error) => errorCallBack?.(error));

    await promise;
  }

  async readImages(
    id: string,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    const imagesObservable: Observable<ListProductImage[]> = this.httpClint.get<
      ListProductImage[]
    >(
      {
        controller: 'products',
        action: 'GetProductImages',
      },
      id
    );
    const promiseImages = firstValueFrom(imagesObservable);
    promiseImages
      .then((_) => {
        successCallBack?.();
      })
      .catch((error) => {
        errorCallBack?.(error);
      });
    return await promiseImages;
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

  async updateShowCase(
    productId: string,
    imageId: string,
    callBack?: () => void
  ) {
    const observable = this.httpClint.put(
      {
        controller: 'products',
        action: 'ChangeImageToShowCase',
      },
      {
        ImageId: imageId,
        ProductId: productId,
      }
    );

    const response = await firstValueFrom(observable);
    callBack?.();
    return response;
  }
}
