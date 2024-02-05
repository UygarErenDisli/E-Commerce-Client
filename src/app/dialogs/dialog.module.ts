import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import { MatCardModule } from '@angular/material/card';
import { UpdateProductDialogComponent } from './update-product-dialog/update-product-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DeleteBasketItemDialogComponent } from './delete-basket-item-dialog/delete-basket-item-dialog.component';
import { CompleteShoppingDialogComponent } from './complete-shopping-dialog/complete-shopping-dialog.component';
import { DetailedOrderDialogComponent } from './detailed-order-dialog/detailed-order-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { CheckoutDialogComponent } from './checkout-dialog/checkout-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompleteOrderDialogComponent } from './complete-order-dialog/complete-order-dialog.component';
import { MenuActionsListDialogComponent } from './menu-actions-list-dialog/menu-actions-list-dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { AddRoleToActionDialogComponent } from './add-role-to-action-dialog/add-role-to-action-dialog.component';
import { AddRoleDialogComponent } from './add-role-dialog/add-role-dialog.component';
import { UpdateRoleDialogComponent } from './update-role-dialog/update-role-dialog.component';

@NgModule({
  declarations: [
    DeleteDialogComponent,
    SelectProductImageDialogComponent,
    UpdateProductDialogComponent,
    DeleteBasketItemDialogComponent,
    CompleteShoppingDialogComponent,
    DetailedOrderDialogComponent,
    CheckoutDialogComponent,
    CompleteOrderDialogComponent,
    MenuActionsListDialogComponent,
    AddRoleToActionDialogComponent,
    AddRoleDialogComponent,
    UpdateRoleDialogComponent,
  ],
  imports: [
    CommonModule,
    FileUploadModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatListModule,
    MatDividerModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSortModule,
  ],
})
export class DialogModule {}
