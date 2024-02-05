import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  SpinnerComponent,
  SpinnerType,
} from '../../../../base/spinner/spinner.component';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../../../services/alerts/customtoastr.service';
import { DialogService } from '../../../../services/common/dialog.service';
import { ApplicationService } from '../../../../services/common/models/application.service';
import { Action, Menu } from '../../../../contracts/application/menu';
import { MenuActionsListDialogComponent } from '../../../../dialogs/menu-actions-list-dialog/menu-actions-list-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent extends SpinnerComponent {
  displayedColumns: string[] = ['name', 'actionCount', 'detail'];
  dataSource: MatTableDataSource<Menu> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    spinner: NgxSpinnerService,
    private toastrAlert: CustomToastrService,
    private dialogSerivce: DialogService,
    private applicationService: ApplicationService
  ) {
    super(spinner);
  }

  async getOrders() {
    this.showSpinner(SpinnerType.BallSpin);
    const listOrdes: Menu[] =
      await this.applicationService.getAllApplicationEndpoints(
        () => {
          this.hideSpinner(SpinnerType.BallSpin);
        },
        (errorMessage) => {
          this.toastrAlert.message(
            'An unexpected error was encountered while getting the Endpoints',
            'Error!!',
            {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight,
            }
          );
        }
      );
    this.dataSource = new MatTableDataSource<Menu>(listOrdes);
    this.dataSource.sort = this.sort;
  }

  getActions(actions: Action[]) {
    this.dialogSerivce.openDialog({
      component: MenuActionsListDialogComponent,
      data: actions,
      options: {
        width: '1440px',
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async ngOnInit(): Promise<void> {
    await this.getOrders();
  }
}
