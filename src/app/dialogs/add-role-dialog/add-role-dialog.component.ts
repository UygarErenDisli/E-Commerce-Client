import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';
import { RoleService } from '../../services/common/models/role.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../services/alerts/customtoastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/spinner/spinner.component';

@Component({
  selector: 'app-add-role-dialog',
  templateUrl: './add-role-dialog.component.html',
  styleUrl: './add-role-dialog.component.scss',
})
export class AddRoleDialogComponent extends BaseDialog<AddRoleDialogComponent> {
  constructor(
    dialogRef: MatDialogRef<AddRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddRoleDialogState,
    private roleService: RoleService,
    private toastr: CustomToastrService,
    private spinner: NgxSpinnerService
  ) {
    super(dialogRef);
  }

  async addRole(name: string) {
    this.spinner.show(SpinnerType.BallCLipRotate);
    const result = await this.roleService.createRole(name, (errorMessage) => {
      this.spinner.hide(SpinnerType.BallCLipRotate);
      this.toastr.message('An Error Occured', 'Error', {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight,
      });
    });
    if (result) {
      this.spinner.hide(SpinnerType.BallCLipRotate);
      this.toastr.message('Successfully created a role', 'Success', {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight,
      });
    }
  }
}

export enum AddRoleDialogState {
  Close,
}
