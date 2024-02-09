import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/spinner/spinner.component';
import { ListRoles } from '../../contracts/roles/list-role';
import { Role } from '../../contracts/roles/role';
import { AddRoleToEndpoint } from '../../entities/endpoint/add-role-to-endpoint';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../services/alerts/customtoastr.service';
import { RoleService } from '../../services/common/models/role.service';
import { BaseDialog } from '../base/base-dialog';
import { UserService } from '../../services/common/models/user.service';
import { AddRolesToUser } from '../../entities/user/add-role-to-user';

@Component({
  selector: 'app-assign-role-to-user-dialog',
  templateUrl: './assign-role-to-user-dialog.component.html',
  styleUrl: './assign-role-to-user-dialog.component.scss',
})
export class AssignRoleToUserDialogComponent
  extends BaseDialog<AssignRoleToUserDialogComponent>
  implements OnInit
{
  allRoles?: ListRoles;
  assignedRoles: string[] = [];
  userName = (this.data as AddRolesToUser).userName;
  nameSurname = (this.data as AddRolesToUser).nameSurname;

  constructor(
    dialogRef: MatDialogRef<AssignRoleToUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: AddRolesToUser,
    private spinner: NgxSpinnerService,
    private toastr: CustomToastrService,
    private roleService: RoleService,
    private userService: UserService
  ) {
    super(dialogRef);
  }
  async ngOnInit(): Promise<void> {
    this.spinner.show(SpinnerType.BallCLipRotate);
    this.allRoles = await this.roleService.getAllRoles(-1, -1);
    this.assignedRoles = await this.userService.getRolesToUser(
      this.data.userId
    );
    this.spinner.hide(SpinnerType.BallCLipRotate);
  }
  async assignRole(roles: MatSelectionList) {
    this.spinner.show(SpinnerType.BallCLipRotate);
    const selectedRoles = roles._value as unknown as Role[];
    await this.userService.assignRoleToEndpoint(
      this.data.userId,
      selectedRoles,
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
