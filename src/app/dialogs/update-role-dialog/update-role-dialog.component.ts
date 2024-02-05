import { Component, Inject, OnInit } from '@angular/core';
import { UpdateRole } from '../../entities/role/update-role';
import { BaseDialog } from '../base/base-dialog';
import { RoleService } from '../../services/common/models/role.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../services/alerts/customtoastr.service';
import { SpinnerType } from '../../base/spinner/spinner.component';
import { TOAST_CONFIG } from 'ngx-toastr';

@Component({
  selector: 'app-update-role-dialog',
  templateUrl: './update-role-dialog.component.html',
  styleUrl: './update-role-dialog.component.scss',
})
export class UpdateRoleDialogComponent
  extends BaseDialog<UpdateRoleDialogComponent>
  implements OnInit
{
  role!: UpdateRole;

  constructor(
    dialogRef: MatDialogRef<UpdateRoleDialogComponent>,
    private roleService: RoleService,
    private spinner: NgxSpinnerService,
    private toastr: CustomToastrService,
    @Inject(MAT_DIALOG_DATA)
    public data: UpdateRoleDialogState | UpdateRole
  ) {
    super(dialogRef);
  }
  ngOnInit(): void {
    this.role = this.data as UpdateRole;
  }

  async saveRole(newName: string) {
    this.spinner.show(SpinnerType.BallCLipRotate);
    const result = await this.roleService.updateRole(
      this.role.id,
      newName,
      (_) => {
        this.spinner.hide(SpinnerType.BallCLipRotate);
        this.toastr.message('An Error Occured', 'Error', {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        });
      }
    );
    if (result) {
      this.spinner.hide(SpinnerType.BallCLipRotate);
      this.toastr.message('Update Successfull', 'Success', {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight,
      });
    }
  }
}

export enum UpdateRoleDialogState {
  Cancel,
}
