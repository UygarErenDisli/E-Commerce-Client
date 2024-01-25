import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-complete-shopping-dialog',
  templateUrl: './complete-shopping-dialog.component.html',
  styleUrl: './complete-shopping-dialog.component.scss',
})
export class CompleteShoppingDialogComponent extends BaseDialog<CompleteShoppingDialogComponent> {
  constructor(
    dialogRef: MatDialogRef<CompleteShoppingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompleteShoppingState
  ) {
    super(dialogRef);
  }
}

export enum CompleteShoppingState {
  Yes,
  No,
}
