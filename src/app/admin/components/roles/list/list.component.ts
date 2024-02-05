import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RoleService } from '../../../../services/common/models/role.service';
import { DialogService } from '../../../../services/common/dialog.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../../../services/alerts/customtoastr.service';
import {
  SpinnerComponent,
  SpinnerType,
} from '../../../../base/spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListRoles } from '../../../../contracts/roles/list-role';
import { Role } from '../../../../contracts/roles/role';
import {
  AddRoleDialogComponent,
  AddRoleDialogState,
} from '../../../../dialogs/add-role-dialog/add-role-dialog.component';
import { UpdateRoleDialogComponent } from '../../../../dialogs/update-role-dialog/update-role-dialog.component';
import { UpdateRole } from '../../../../entities/role/update-role';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent extends SpinnerComponent implements OnInit {
  displayedColumns: string[] = ['name', 'update', 'delete'];

  dataSource: MatTableDataSource<Role> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    spinner: NgxSpinnerService,
    private roleService: RoleService,
    private dialogService: DialogService,
    private toastr: CustomToastrService
  ) {
    super(spinner);
  }

  async getRoles() {
    this.showSpinner(SpinnerType.BallSpin);
    const listRoles: ListRoles = await this.roleService.getAllRoles(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      (_) => {
        this.toastr.message(
          'An unexpected error was encountered while getting the roles',
          'Error!!',
          {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopRight,
          }
        );
      }
    );
    this.dataSource = new MatTableDataSource<Role>(listRoles?.roles);
    this.paginator!.length = listRoles.totalCount;
    this.dataSource.sort = this.sort;
  }

  openRoleCreatingDialog() {
    this.dialogService.openDialog({
      component: AddRoleDialogComponent,
      data: AddRoleDialogState.Close,
      afterClosed: async () => {
        await this.getRoles();
      },
    });
  }

  openUpdateRoleDialog(id: string, name: string) {
    const updateRole = new UpdateRole();
    updateRole.id = id;
    updateRole.name = name;
    this.dialogService.openDialog({
      component: UpdateRoleDialogComponent,
      data: updateRole,
      afterClosed: async () => {
        await this.getRoles();
      },
    });
  }

  async ngOnInit(): Promise<void> {
    await this.getRoles();
  }

  async pageChanged() {
    await this.getRoles();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
