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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild(DynamicComponentLoaderDirective, { static: true })
  dynamicComponentLoaderDirective!: DynamicComponentLoaderDirective;

  constructor(
    public authService: AuthService,
    private toastr: CustomToastrService,
    private router: Router,
    private dynamicComponentLoaderService: DynamicComponentLoaderService
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

  loadBasketComponent() {
    this.dynamicComponentLoaderService.loadComponent(
      ComponentNames.BasketsComponent,
      this.dynamicComponentLoaderDirective.viewContainerRef
    );
  }
}
