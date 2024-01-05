import { Component, ViewChild } from '@angular/core';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  @ViewChild(ListComponent) listComponent: ListComponent | undefined;

  productCreated() {
    this.listComponent?.getProducts();
  }
}
