import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-add-role-to-action-dialog',
  templateUrl: './add-role-to-action-dialog.component.html',
  styleUrl: './add-role-to-action-dialog.component.scss',
})
export class AddRoleToActionDialogComponent extends BaseDialog<AddRoleToActionDialogComponent> {
  constructor(
    dialogRef: MatDialogRef<AddRoleToActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddRoleToActionDialogState
  ) {
    super(dialogRef);
  }
}

export enum AddRoleToActionDialogState {
  Yes,
  No,
}
