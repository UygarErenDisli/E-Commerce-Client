import { NgxSpinnerService } from 'ngx-spinner';
import {
  SpinnerComponent,
  SpinnerType,
} from '../../../base/spinner/spinner.component';
import {
  CustomToastrService,
  ToastrMessageType,
} from './../../../services/alerts/customtoastr.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent extends SpinnerComponent implements OnInit {
  constructor(private toastr: CustomToastrService, spinner: NgxSpinnerService) {
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallSpin);
  }

  showAlert() {
    this.toastr.message('Example Alert', 'Admin Dashboard', {
      messageType: ToastrMessageType.Success,
    });
  }
}
