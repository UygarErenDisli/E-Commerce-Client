import { NgxSpinnerService } from 'ngx-spinner';
import {
  SpinnerComponent,
  SpinnerType,
} from '../../../base/spinner/spinner.component';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './../../../services/alerts/customtoastr.service';
import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../../../services/common/signalR.service';
import { HubUrls } from '../../../constants/hubUrl';
import { SignalRFunctionNames } from '../../../constants/signalRfunctionNames';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent extends SpinnerComponent implements OnInit {
  constructor(
    private toastr: CustomToastrService,
    spinner: NgxSpinnerService,
    private signalRservice: SignalRService
  ) {
    super(spinner);
  }
  ngOnInit(): void {
    this.signalRservice.on(
      HubUrls.ProductAdded,
      SignalRFunctionNames.ReceiveProductAddedMessageFunction,
      (message: string) => {
        this.toastr.message(message, 'SignalR', {
          messageType: ToastrMessageType.Info,
          position: ToastrPosition.TopRight,
        });
      }
    );
    this.signalRservice.on(
      HubUrls.OrderCreated,
      SignalRFunctionNames.ReceiveOrderCreatedMessageFunction,
      (message: string) => {
        this.toastr.message(message, 'SignalR', {
          messageType: ToastrMessageType.Info,
          position: ToastrPosition.TopCenter,
        });
      }
    );
  }

  showAlert() {
    this.toastr.message('Example Alert', 'Admin Dashboard', {
      messageType: ToastrMessageType.Success,
    });
  }
}
