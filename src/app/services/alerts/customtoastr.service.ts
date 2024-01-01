import { Injectable } from '@angular/core';
import { IndividualConfig, Toast, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CustomToastrService {
  constructor(private toastr: ToastrService) {}
  message(message: string, title: string, options: Partial<ToastrOptions>) {
    this.toastr[options.messageType!](message, title);
  }
}

export class ToastrOptions {
  messageType: ToastrMessageType = ToastrMessageType.Success;
  position: ToastrPosition = ToastrPosition.TopRight;
  delay: number = 5;
}

export enum ToastrMessageType {
  Error = 'error',
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
}

export enum ToastrPosition {
  TopRight = 'toast-top-right',
  TopCenter = 'toast-top-center',
  TopLeft = 'toast-top-let',
  TopFullWidth = 'toast-top-full-width',
  BottomRight = 'toast-bottom-right',
  BottomCenter = 'toast-bottom-center',
  BottomLeft = 'toast-bottom-left',
  BottomFullWidth = 'toast-bottom-full-width',
}
