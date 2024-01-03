import { Component } from '@angular/core';
import { CreateProduct } from '../../../../contracts/create-product';
import { ProductService } from '../../../../services/common/models/product.service';
import {
  SpinnerComponent,
  SpinnerType,
} from '../../../../base/spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../../../services/alerts/customtoastr.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent extends SpinnerComponent {
  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertService: CustomToastrService
  ) {
    super(spinner);
  }
  create(
    name: HTMLInputElement,
    stock: HTMLInputElement,
    price: HTMLInputElement
  ) {
    this.showSpinner(SpinnerType.BallSpin);

    const create_product: CreateProduct = new CreateProduct();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.BallSpin);
      this.alertService.message(
        'Successfully added product',
        `${create_product.name}`,
        {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight,
        }
      );
    });
  }
}
