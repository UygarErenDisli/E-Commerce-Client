import { AuthorizationEndpointService } from './../../services/common/models/authorization-endpoint.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';
import { AddRoleToEndpoint } from '../../entities/endpoint/add-role-to-endpoint';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../services/alerts/customtoastr.service';
import { RoleService } from '../../services/common/models/role.service';
import { ListRoles } from '../../contracts/roles/list-role';
import { MatSelectionList } from '@angular/material/list';
import { SpinnerType } from '../../base/spinner/spinner.component';
import { Role } from '../../contracts/roles/role';

@Component({
  selector: 'app-add-role-to-action-dialog',
  templateUrl: './add-role-to-action-dialog.component.html',
  styleUrl: './add-role-to-action-dialog.component.scss',
})
export class AddRoleToActionDialogComponent
  extends BaseDialog<AddRoleToActionDialogComponent>
  implements OnInit
{
  allRoles?: ListRoles;
  assignedRoleIds: string[] = [];
  actionCode = (this.data as AddRoleToEndpoint).actionCode;
  definition = (this.data as AddRoleToEndpoint).definition;

  menuName = (this.data as AddRoleToEndpoint).menuName;

  constructor(
    dialogRef: MatDialogRef<AddRoleToActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: AddRoleToActionDialogState | AddRoleToEndpoint,
    private spinner: NgxSpinnerService,
    private toastr: CustomToastrService,
    private roleService: RoleService,
    private authorizationEndpointService: AuthorizationEndpointService
  ) {
    super(dialogRef);
  }
  async ngOnInit(): Promise<void> {
    this.spinner.show(SpinnerType.BallCLipRotate);
    this.allRoles = await this.roleService.getAllRoles(-1, -1);
    this.assignedRoleIds = (
      await this.authorizationEndpointService.getRolesToEndpoint(
        this.actionCode,
        this.menuName
      )
    ).map((r) => r.id);
    this.spinner.hide(SpinnerType.BallCLipRotate);
  }
  async assignRole(roles: MatSelectionList) {
    this.spinner.show(SpinnerType.BallCLipRotate);
    const selectedRoles = roles._value as unknown as Role[];
    await this.authorizationEndpointService.assignRoleToEndpoint(
      selectedRoles,
      this.actionCode,
      this.menuName,
      () => {
        this.spinner.hide(SpinnerType.BallCLipRotate);
        this.toastr.message('Successfully Saved', 'Success', {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight,
        });
      },
      () => {
        this.spinner.hide(SpinnerType.BallCLipRotate);
        this.toastr.message('An Error Occured', 'Error', {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        });
      }
    );
    this.spinner.hide(SpinnerType.BallCLipRotate);
  }
}

export enum AddRoleToActionDialogState {
  Yes,
  No,
}
