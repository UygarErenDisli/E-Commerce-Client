import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(dialogParameters: Partial<DialogParameters>): void {
    const dialogRef = this.dialog.open(dialogParameters.component!, {
      width: dialogParameters.options?.width,
      height: dialogParameters.options?.height,
      position: dialogParameters.options?.position,
      data: dialogParameters.data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === dialogParameters.data) {
        dialogParameters.afterClosed?.();
      }
    });
  }
  closeAllDialogs(): void {
    this.dialog.closeAll();
  }
}

export class DialogParameters {
  component!: ComponentType<any>;
  data!: any;
  afterClosed?: () => void;
  options?: Partial<DialogOptions>;
}

export class DialogOptions {
  width?: string;
  height?: string;
  position?: DialogPosition;
}
