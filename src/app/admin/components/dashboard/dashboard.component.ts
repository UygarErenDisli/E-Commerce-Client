import {
  CustomtoastrService,
  ToastrMessageType,
} from './../../../services/alerts/customtoastr.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private toastr: CustomtoastrService) {}

  showAlert() {
    this.toastr.message('Example Alert', 'Admin Dashboard', {
      messageType: ToastrMessageType.Success,
    });
  }
}
