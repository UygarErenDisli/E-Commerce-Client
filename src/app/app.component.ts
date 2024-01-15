import { Router } from '@angular/router';
import { Component, afterRender } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './services/alerts/customtoastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private toastr: CustomToastrService,
    private router: Router
  ) {
    afterRender(() => {
      setTimeout(() => {
        authService.checkIdentity();
      }, 0);
    });
  }

  singOut() {
    localStorage.removeItem('accessToken');
    this.authService.checkIdentity();
    this.router.navigate(['']);
    this.toastr.message('You have been logged out.', 'Signed out', {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight,
    });
  }
}
