import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpclient.service';
import { User } from '../../../entities/user';
import { CreateUser } from '../../../contracts/user/create-user';
import { Observable, first, firstValueFrom } from 'rxjs';
import { LoginUser } from '../../../entities/login-user';
import { log } from 'console';
import { callbackify } from 'util';
import { LoginUserResponse } from '../../../contracts/user/login-user-response';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../alerts/customtoastr.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClientService,
    private toastr: CustomToastrService
  ) {}

  async createUser(user: User): Promise<CreateUser> {
    const observableResponse: Observable<CreateUser | User> =
      this.httpClient.post<CreateUser | User>(
        {
          controller: 'identity',
          action: 'CreateUser',
        },
        user
      );

    return (await firstValueFrom(observableResponse)) as CreateUser;
  }

  async login(
    loginUser: Partial<LoginUser>,
    callBackFunction?: () => void
  ): Promise<any> {
    const loginObservable: Observable<any> = this.httpClient.post<
      any | LoginUserResponse
    >(
      {
        controller: 'identity',
        action: 'Login',
      },
      loginUser
    );

    const response: LoginUserResponse = (await firstValueFrom(
      loginObservable
    )) as LoginUserResponse;

    if (response) {
      localStorage.setItem('accessToken', response.accessToken);

      callBackFunction?.();
    }
  }
}
