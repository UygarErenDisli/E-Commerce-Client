import { ToastrPosition } from './../../../../services/alerts/customtoastr.service';
import {
  ListProduct,
  ListProducts,
} from './../../../../contracts/product/list-products';
import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { FilesService } from '../../../../services/common/files.service';
import { ActivatedRoute } from '@angular/router';
import { BaseUrl } from '../../../../contracts/files/base-url';
import { param } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../../../base/spinner/spinner.component';
import { BasketService } from '../../../../services/common/models/basket.service';
import {
  CustomToastrService,
  ToastrMessageType,
} from '../../../../services/alerts/customtoastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  productList?: ListProducts;
  baseUrls?: BaseUrl;

  pageSize: number = 12;
  currentPageNo: number = 1;
  totalProductCount?: number;
  totalPageCount?: number;
  pageList: number[] = [];

  constructor(
    private productService: ProductService,
    private filesService: FilesService,
    private basketServive: BasketService,
    private activatedRouter: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: CustomToastrService
  ) {}

  async ngOnInit() {
    this.spinner.show(SpinnerType.BallSpin);
    this.baseUrls = await this.filesService.getBaseUrl();

    this.activatedRouter.params.subscribe(async (params) => {
      this.currentPageNo = parseInt(params['pageNo'] ?? 1);
      const productsFromDb: ListProducts | undefined =
        await this.productService.read(
          this.currentPageNo - 1,
          this.pageSize,
          () => {
            this.spinner.hide(SpinnerType.BallSpin);
          },
          (errorMessage) => {}
        );
      this.productList = productsFromDb;

      this.findProductsShowCases();

      this.totalProductCount = this.productList?.totalCount;
      this.totalPageCount = Math.ceil(this.totalProductCount! / this.pageSize);

      this.pageList = [];

      this.adjustPaginationBar();
    });
  }

  private findProductsShowCases() {
    this.productList!.products = this.productList?.products?.map((p) => {
      const newProducts: ListProduct = {
        id: p.id,
        name: p.name,
        price: p.price,
        stock: p.stock,
        updatedDate: p.updatedDate,
        createdDate: p.createdDate,
        productImages: p.productImages,
        showCaseImagePath: `${this.baseUrls?.baseStorageUrl}/${
          p.productImages?.length
            ? p.productImages.find((i) => i.isShowCaseImage)?.path
            : ''
        }`,
        hasShowCaseImage: p.productImages?.length
          ? p.productImages?.find((i) => i.isShowCaseImage === true) !==
            undefined
          : false,
      };
      return newProducts;
    });
  }

  private adjustPaginationBar() {
    if (this.totalPageCount! >= 7) {
      if (this.currentPageNo - 3 <= 0) {
        for (let i = 1; i <= 7; i++) {
          this.pageList.push(i);
        }
      } else if (this.currentPageNo + 3 >= this.totalPageCount!) {
        for (let i = this.totalPageCount! - 6; i <= this.totalPageCount!; i++) {
          this.pageList.push(i);
        }
      } else {
        for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++) {
          this.pageList.push(i);
        }
      }
    } else {
      if (this.currentPageNo - 3 <= 0) {
        for (let i = 1; i <= this.totalPageCount!; i++) {
          this.pageList.push(i);
        }
      } else if (this.currentPageNo + 3 >= this.totalPageCount!) {
        for (
          let i =
            this.totalPageCount! - 6 <= 0
              ? this.totalPageCount! - (this.totalPageCount! - 1)
              : this.totalPageCount! - 6;
          i <= this.totalPageCount!;
          i++
        ) {
          this.pageList.push(i);
        }
      } else {
        for (
          let i = this.totalPageCount! - 3;
          i <= this.totalPageCount! + 3;
          i++
        ) {
          this.pageList.push(i);
        }
      }
    }
  }

  async addItemToBasket(productId: string) {
    this.spinner.show(SpinnerType.BallSpin);
    await this.basketServive.addItemToBasket(productId, 1);
    this.toastr.message('Product Added To Basket', 'Product Added', {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight,
    });
    this.spinner.hide(SpinnerType.BallSpin);
  }
}
