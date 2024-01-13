import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpclient.service';
import { User } from '../../../entities/user';
import { CreateUser } from '../../../contracts/create-user';
import { Observable, first, firstValueFrom } from 'rxjs';
import { LoginUser } from '../../../entities/login-user';
import { log } from 'console';
import { callbackify } from 'util';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClientService) {}

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

  async login(loginUser: Partial<LoginUser>, callBackFunction?: () => void) {
    const loginObservable: Observable<any> = this.httpClient.post(
      {
        controller: 'identity',
        action: 'Login',
      },
      loginUser
    );

    const response = await firstValueFrom(loginObservable);
    callBackFunction?.();
    return response;
  }
}
