import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  SpinnerComponent,
  SpinnerType,
} from '../../../../base/spinner/spinner.component';
import { DetailedOrderDialogComponent } from '../../../../dialogs/detailed-order-dialog/detailed-order-dialog.component';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../../../services/alerts/customtoastr.service';
import { DialogService } from '../../../../services/common/dialog.service';
import { UserService } from '../../../../services/common/models/user.service';
import { ListUser, ListUsers } from '../../../../contracts/user/list-users';
import { AssignRoleToUserDialogComponent } from '../../../../dialogs/assign-role-to-user-dialog/assign-role-to-user-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent extends SpinnerComponent {
  displayedColumns: string[] = [
    'userName',
    'nameSurname',
    'userEmail',
    'roles',
    'delete',
  ];
  dataSource: MatTableDataSource<ListUser> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    spinner: NgxSpinnerService,
    private toastrAlert: CustomToastrService,
    private dialogSerivce: DialogService,
    private userService: UserService
  ) {
    super(spinner);
  }

  async getUsers() {
    this.showSpinner(SpinnerType.BallSpin);
    const listUsers: ListUsers = await this.userService.getAllUsers(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      (errorMessage) => {
        this.toastrAlert.message(
          'An unexpected error was encountered while getting the orders',
          'Error!!',
          {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopRight,
          }
        );
      }
    );
    this.dataSource = new MatTableDataSource<ListUser>(listUsers.users);

    this.paginator!.length = listUsers?.totalCount;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openUserRoles(id: string, nameSurname: string, userName: string) {
    this.dialogSerivce.openDialog({
      component: AssignRoleToUserDialogComponent,
      data: { userId: id, nameSurname, userName },
      options: {
        width: '1440px',
      },
    });
  }

  async pageChanged() {
    await this.getUsers();
  }
  async ngOnInit(): Promise<void> {
    await this.getUsers();
  }
}
