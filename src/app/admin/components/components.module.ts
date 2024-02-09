import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    OrdersModule,
    CustomersModule,
    DashboardModule,
    AuthorizeMenuModule,
    RolesModule,
    UsersModule,
  ],
})
export class ComponentsModule {}
