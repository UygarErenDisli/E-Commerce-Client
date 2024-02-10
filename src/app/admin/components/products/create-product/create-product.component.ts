import { Component, EventEmitter, Output } from '@angular/core';
import { CreateProduct } from '../../../../contracts/product/create-product';
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
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent extends SpinnerComponent {
  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertService: CustomToastrService,
    private formBuilder: FormBuilder
  ) {
    super(spinner);
  }

  productFromGroup = this.formBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(60)],
    ],
    stock: ['', [Validators.required, Validators.min(0)]],
    price: ['', [Validators.required, Validators.min(0)]],
  });

  @Output() productCreated: EventEmitter<CreateProduct> = new EventEmitter();
  async create(name: string, stock: string, price: string) {
    this.showSpinner(SpinnerType.BallSpin);

    const create_product: CreateProduct = new CreateProduct();
    create_product.name = name;
    create_product.stock = parseInt(stock);
    create_product.price = parseFloat(price);

    await this.productService.create(
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
        this.alertService.message(
          'Ürünü oluştururken beklenmeyen bir hata ile karşılaşıldı. Lütfen ürün bilgilerini kontrol ettikten sonra tekrar deneyiniz',
          'Error',
          {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopCenter,
          }
        );
      }
    );
  }
}
