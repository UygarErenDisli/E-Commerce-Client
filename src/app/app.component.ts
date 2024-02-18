import { DynamicComponentLoaderDirective } from './directives/common/dynamic-component-loader.directive';
import {
  ComponentNames,
  DynamicComponentLoaderService,
} from './services/common/dynamic-component-loader.service';
import { Router } from '@angular/router';
import { Component, ViewChild, afterRender } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './services/alerts/customtoastr.service';
import { UserService } from './services/common/models/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from './base/spinner/spinner.component';
import { UserNotification } from './contracts/user/user-notifications';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  userNotifications?: UserNotification[];
  isLoading: boolean = true;
  @ViewChild(DynamicComponentLoaderDirective, { static: true })
  dynamicComponentLoaderDirective!: DynamicComponentLoaderDirective;

  constructor(
    public authService: AuthService,
    private toastr: CustomToastrService,
    private router: Router,
    private dynamicComponentLoaderService: DynamicComponentLoaderService,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {
    afterRender(() => {
      setTimeout(() => {
        authService.checkIdentity();
      }, 0);
    });
  }

  singOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('hasAccessToAdminDashboard');
    this.authService.checkIdentity();
    this.router.navigate(['']);
    this.toastr.message('You have been logged out.', 'Signed out', {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight,
    });
  }

  loadBasketComponent() {
    this.dynamicComponentLoaderService.loadComponent(
      ComponentNames.BasketsComponent,
      this.dynamicComponentLoaderDirective.viewContainerRef
    );
  }

  async getNotifications() {
    let response = await this.userService.getUserNotifications(
      () => {
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
        this.toastr.message(
          'An unexpected error was encountered while getting notifications',
          'Error',
          {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopRight,
          }
        );
      }
    );
    this.userNotifications = response.reverse();
  }

  async deleteNotification(notificationId: string) {
    this.spinner.show(SpinnerType.BallSpin);
    await this.userService.deleteUserNotification(notificationId);
    $('#' + notificationId).fadeOut(1000, () => {});
    this.spinner.hide(SpinnerType.BallSpin);
  }
}
