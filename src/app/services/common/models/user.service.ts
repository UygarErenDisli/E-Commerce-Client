import { User } from './../../../entities/user';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpclient.service';
import { CreateUser } from '../../../contracts/user/create-user';
import { Observable, firstValueFrom } from 'rxjs';
import { UserNotification } from '../../../contracts/user/user-notifications';

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

  async getUserNotifications(): Promise<UserNotification[]> {
    const observable: Observable<UserNotification[]> = this.httpClient.get<
      UserNotification[]
    >({
      controller: 'identity',
    });

    return await firstValueFrom(observable);
  }

  async deleteUserNotification(notificationId: string) {
    const observable = this.httpClient.delete(
      {
        controller: 'identity',
      },
      notificationId
    );

    return await firstValueFrom(observable);
  }
}
