import { Component, EventEmitter, Output } from '@angular/core';
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
import { outputAst } from '@angular/compiler';
import { FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';

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

  @Output() productCreated: EventEmitter<CreateProduct> = new EventEmitter();
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

    this.productService.create(
      create_product,
      () => {
        this.hideSpinner(SpinnerType.BallSpin);
        this.productCreated.emit();

        this.alertService.message(
          'Successfully added',
          `${create_product.name}`,
          {
            messageType: ToastrMessageType.Success,
            position: ToastrPosition.TopRight,
          }
        );
      },
      (errorMessage) => {
        this.alertService.message(errorMessage, 'Product', {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        });
      }
    );
  }
}
