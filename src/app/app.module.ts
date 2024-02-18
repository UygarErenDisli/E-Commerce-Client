import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService } from './guards/common/auth.guard';
import {
  GoogleLoginProvider,
  GoogleSigninButtonModule,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';
import { DynamicComponentLoaderDirective } from './directives/common/dynamic-component-loader.directive';
@NgModule({
  declarations: [AppComponent, DynamicComponentLoaderDirective],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(),
    {
      provide: 'baseUrl',
      useValue: 'http://localhost:5158/api',
      multi: true,
    },
    {
      provide: 'domainUrl',
      useValue: 'http://localhost:5158',
      multi: true,
    },
    AuthGuardService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(''),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: (): string | Promise<string> => {
          if (typeof localStorage !== 'undefined') {
            return localStorage?.getItem('accessToken')!;
          } else {
            return new Promise((resolve, reject) => {
              resolve('Not Authrozed');
            });
          }
        },
        allowedDomains: ['localhost:5158'],
      },
    }),
    SocialLoginModule,
    GoogleSigninButtonModule,
  ],
})
export class AppModule {}
