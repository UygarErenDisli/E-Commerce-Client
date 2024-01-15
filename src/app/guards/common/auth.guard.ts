import { delay } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../services/alerts/customtoastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/spinner/spinner.component';
import { _isAuthenticated } from '../../services/common/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuardService).canActivate(route, state);
};

@Injectable()
export class AuthGuardService {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private toastr: CustomToastrService,
    private spinner: NgxSpinnerService
  ) {}

  canActivate(rote: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.spinner.show(SpinnerType.BallCLipRotate);

    if (!_isAuthenticated) {
      this.router.navigate(['login'], {
        queryParams: { returnUrl: state.url },
      });

      this.toastr.message('You need to log in', 'Unauthorized Access', {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight,
        timeOut: 3000,
      });
    }
    this.spinner.hide(SpinnerType.BallCLipRotate);
    return true;
  }
}
