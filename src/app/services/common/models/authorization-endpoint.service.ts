import { Observable, firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpclient.service';
import { Role } from '../../../contracts/roles/role';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationEndpointService {
  constructor(private httpClient: HttpClientService) {}

  async getRolesToEndpoint(
    endpointCode: string,
    menuName: string,
    errorCallBack?: (errorMessage: any) => void
  ): Promise<Role[]> {
    const observable: Observable<Role[]> = this.httpClient.post<Role[] | any>(
      {
        controller: 'AuthorizationEndpoint',
        action: 'GetRolesToEndpoint',
      },
      {
        endpointCode,
        menuName,
      }
    );

    const promise = firstValueFrom(observable);
    promise.catch((errorMessage) => {
      errorCallBack?.(errorMessage);
    });

    return await promise;
  }

  async assignRoleToEndpoint(
    roles: Role[],
    endpointCode: string,
    menuName: string,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: any) => void
  ): Promise<void> {
    const observable = this.httpClient.post(
      {
        controller: 'AuthorizationEndpoint',
        action: 'AssignRoleToEndpoint',
      },
      {
        roles,
        endpointCode,
        menuName,
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
}
