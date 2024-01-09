import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  SpinnerComponent,
  SpinnerType,
} from '../../../../base/spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from '../../../../services/common/models/product.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../../../services/alerts/customtoastr.service';
import { ListProduct, ListProducts } from '../../../../contracts/list-products';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../../../../services/common/dialog.service';
import { SelectProductImageDialogComponent } from '../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent extends SpinnerComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'stock',
    'price',
    'createdDate',
    'updatedDate',
    'images',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<ListProduct> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private toastrAlert: CustomToastrService,
    private dialogSerivce: DialogService
  ) {
    super(spinner);
  }

  @ViewChild(MatSort) sort!: MatSort;

  async getProducts() {
    this.showSpinner(SpinnerType.BallSpin);
    const listProducts: ListProducts | undefined =
      await this.productService.read(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        () => {
          this.hideSpinner(SpinnerType.BallSpin);
        },
        (errorMessage) => {
          this.toastrAlert.message(
            'An unexpected error was encountered while getting the products',
            'Error!!',
            {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight,
            }
          );
        }
      );
    this.dataSource = new MatTableDataSource<ListProduct>(
      listProducts?.products
    );

    this.paginator!.length = listProducts?.totalCount;
    this.dataSource.sort = this.sort;
  }

  getProductImages(productName: string, id: string) {
    const data = new ListProductDetails();
    data.productId = id;
    data.productName = productName;
    this.dialogSerivce.openDialog({
      component: SelectProductImageDialogComponent,
      data: data,
      options: {
        width: '1440px',
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async pageChanged() {
    await this.getProducts();
  }
  async ngOnInit(): Promise<void> {
    await this.getProducts();
  }
}

export class ListProductDetails {
  productId!: string;
  productName!: string;
}
