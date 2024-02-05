import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';
import { Action } from '../../contracts/application/menu';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DialogService } from '../../services/common/dialog.service';
import {
  AddRoleToActionDialogComponent,
  AddRoleToActionDialogState,
} from '../add-role-to-action-dialog/add-role-to-action-dialog.component';

@Component({
  selector: 'app-menu-actions-list-dialog',
  templateUrl: './menu-actions-list-dialog.component.html',
  styleUrl: './menu-actions-list-dialog.component.scss',
})
export class MenuActionsListDialogComponent
  extends BaseDialog<MenuActionsListDialogComponent>
  implements AfterViewInit
{
  displayedColumns: string[] = [
    'actionCode',
    'actionType',
    'httpType',
    'definition',
    'addRole',
  ];
  dataSource: MatTableDataSource<Action> = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    dialogRef: MatDialogRef<MenuActionsListDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: MenuActionsListDialogsState | Action[],
    private dialogService: DialogService
  ) {
    super(dialogRef);
  }
  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource<Action>(this.data as Action[]);
    this.dataSource.sort = this.sort;
  }

  addRole() {
    this.dialogService.openDialog({
      component: AddRoleToActionDialogComponent,
      data: AddRoleToActionDialogState.Yes,
      options: {
        width: '970px',
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export enum MenuActionsListDialogsState {
  Yes,
  No,
}
