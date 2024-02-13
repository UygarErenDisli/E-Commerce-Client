import { User } from '../../../entities/user/user';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpclient.service';
import { CreateUser } from '../../../contracts/user/create-user';
import { Observable, firstValueFrom } from 'rxjs';
import { UserNotification } from '../../../contracts/user/user-notifications';
import { ListUsers } from '../../../contracts/user/list-users';
import { Role } from '../../../contracts/roles/role';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClientService) {}

  async getAllUsers(
    pageIndex: number,
    pageSize: number,
    errorCallBack?: (errorMessage: any) => void
  ): Promise<ListUsers> {
    const observable: Observable<ListUsers> = this.httpClient.get<ListUsers>({
      controller: 'identity',
      action: 'GetAllUsers',
      queryString: `pageIndex=${pageIndex}&pageSize=${pageSize}`,
    });

    const promise = firstValueFrom(observable);
    promise.catch((errorMessage) => {
      errorCallBack?.(errorMessage);
    });

    return await promise;
  }

  async getRolesToUser(
    userId: string,
    errorCallBack?: (errorMessage: any) => void
  ): Promise<string[]> {
    const observable: Observable<{ roles: string[] }> = this.httpClient.get<{
      roles: string[];
    }>(
      {
        controller: 'identity',
        action: 'GetRolesToUser',
      },
      userId
    );

    const promise = firstValueFrom(observable);
    promise.catch((errorMessage) => {
      errorCallBack?.(errorMessage);
    });

    return (await promise).roles;
  }

  async assignRoleToEndpoint(
    userId: string,
    roles: Role[],
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: any) => void
  ): Promise<void> {
    const observable = this.httpClient.post(
      {
        controller: 'identity',
        action: 'AssignRolesToUser',
      },
      {
        userId,
        roles,
      }
    );
    const promise = firstValueFrom(observable);
    promise
      .then((_) => successCallBack?.())
      .catch((errorMessage) => {
        errorCallBack?.(errorMessage);
      });
    await promise;
  }

  async getUserNotifications(
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: any) => void
  ): Promise<UserNotification[] | []> {
    const observable: Observable<UserNotification[]> = this.httpClient.get<
      UserNotification[]
    >({
      controller: 'notifications',
    });
    const promise = firstValueFrom(observable);
    promise
      .then((_) => successCallBack?.())
      .catch((error) => errorCallBack?.(error));
    return await promise;
  }

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

  async deleteUserNotification(
    notificationId: string,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: any) => void
  ): Promise<void> {
    const observable = this.httpClient.delete(
      {
        controller: 'notifications',
      },
      notificationId
    );
    const promise = firstValueFrom(observable);
    promise
      .then((_) => successCallBack?.())
      .catch((error) => errorCallBack?.(error));
    await promise;
  }
}
