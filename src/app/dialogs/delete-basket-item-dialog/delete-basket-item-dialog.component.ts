import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-basket-item-dialog',
  templateUrl: './delete-basket-item-dialog.component.html',
  styleUrl: './delete-basket-item-dialog.component.scss',
})
export class DeleteBasketItemDialogComponent extends BaseDialog<DeleteBasketItemDialogComponent> {
  constructor(
    dialogRef: MatDialogRef<DeleteBasketItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteBasketItemDialogState
  ) {
    super(dialogRef);
  }
}

export enum DeleteBasketItemDialogState {
  Yes,
  No,
}
