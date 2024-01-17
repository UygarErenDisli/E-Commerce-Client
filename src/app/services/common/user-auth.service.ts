import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { LoginUserResponse } from '../../contracts/user/login-user-response';
import { LoginUser } from '../../entities/login-user';
import { HttpClientService } from './httpclient.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private httpClient: HttpClientService) {}

  async login(
    loginUser: Partial<LoginUser>,
    callBackFunction?: () => void
  ): Promise<any> {
    const loginObservable: Observable<any> = this.httpClient.post<
      any | LoginUserResponse
    >(
      {
        controller: 'auth',
        action: 'Login',
      },
      loginUser
    );

    const response: LoginUserResponse = (await firstValueFrom(
      loginObservable
    )) as LoginUserResponse;

    if (response) {
      localStorage.setItem('accessToken', response.accessToken);
    }
    callBackFunction?.();
  }

  async googleLogin(user: SocialUser, callBackFunction?: () => void) {
    const observable: Observable<SocialUser | LoginUserResponse> =
      this.httpClient.post<SocialUser | LoginUserResponse>(
        {
          controller: 'auth',
          action: 'GoogleLogin',
        },
        user
      );

    const response = (await firstValueFrom(observable)) as LoginUserResponse;

    if (response) {
      localStorage.setItem('accessToken', response.accessToken);
    }
    callBackFunction?.();
  }
}
