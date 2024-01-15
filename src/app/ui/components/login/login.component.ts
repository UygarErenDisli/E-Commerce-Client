import { AuthService } from './../../../services/common/auth.service';
import { Component } from '@angular/core';
import {
  SpinnerComponent,
  SpinnerType,
} from '../../../base/spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../../services/common/models/user.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../../services/alerts/customtoastr.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends SpinnerComponent {
  constructor(
    spinner: NgxSpinnerService,
    private userService: UserService,
    private toastr: CustomToastrService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super(spinner);
  }

  async login(userNameOrEmail: HTMLInputElement, password: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallSpin);
    await this.userService.login(
      { userNameOrEmail: userNameOrEmail.value, password: password.value },
      () => {
        this.authService.checkIdentity();
        this.activatedRoute.queryParams.subscribe((params) => {
          const returnUrl = params['returnUrl'];
          if (returnUrl) {
            this.router.navigateByUrl(returnUrl);
          }
          this.router.navigate(['']);
        });
        this.toastr.message('Welcome', 'Login Successfull', {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight,
        });
        this.hideSpinner(SpinnerType.BallSpin);
      }
    );
  }
}
