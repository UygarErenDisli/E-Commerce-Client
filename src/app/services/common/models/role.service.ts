import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpclient.service';
import { Observable, firstValueFrom } from 'rxjs';
import { ListRoles } from '../../../contracts/roles/list-role';
import { Role } from '../../../contracts/roles/role';
import { promises } from 'dns';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private httpClient: HttpClientService) {}

  async getAllRoles(
    pageIndex: number,
    pageSize: number,
    errorCallBack?: (errorMessage: any) => void
  ): Promise<ListRoles> {
    const observable: Observable<ListRoles> = this.httpClient.get<ListRoles>({
      controller: 'roles',
      queryString: `pageIndex=${pageIndex}&pageSize=${pageSize}`,
    });

    const promise = firstValueFrom(observable);
    promise.catch((errorMessage) => {
      errorCallBack?.(errorMessage);
    });

    return await promise;
  }

  async getRoleById(
    id: string,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: any) => void
  ): Promise<Role> {
    const observable: Observable<Role> = this.httpClient.get<Role>(
      {
        controller: 'roles',
      },
      id
    );

    const promise = firstValueFrom(observable);
    promise
      .then((_) => {
        successCallBack?.();
      })
      .catch((errorMessage) => errorCallBack?.(errorMessage));

    return await promise;
  }

  async createRole(
    name: string,
    errorCallBack?: (errorMessage: any) => void
  ): Promise<boolean> {
    const observable: Observable<{ succeeded: boolean }> = this.httpClient.post<
      { succeeded: boolean } | any
    >(
      {
        controller: 'roles',
      },
      {
        name: name,
      }
    );

    const promise = firstValueFrom(observable);
    promise.catch((errorMessage) => errorCallBack?.(errorCallBack));
    return (await promise).succeeded;
  }

  async updateRole(
    id: string,
    name: string,
    errorCallBack?: (errorMessage: any) => void
  ): Promise<boolean> {
    const observable: Observable<{ succeeded: boolean }> = this.httpClient.put<
      { succeeded: boolean } | any
    >(
      {
        controller: 'roles',
      },
      {
        id: id,
        newName: name,
      }
    );

    const promise = firstValueFrom(observable);
    promise.catch((errorMessage) => errorCallBack?.(errorCallBack));
    return (await promise).succeeded;
  }

  async deleteRole(
    id: string,
    errorCallBack?: (errorMessage: any) => void
  ): Promise<boolean> {
    const observable: Observable<{ succeeded: boolean }> =
      this.httpClient.delete<{ succeeded: boolean } | any>(
        {
          controller: 'roles',
        },
        id
      );

    const promise = firstValueFrom(observable);
    promise.catch((errorMessage) => errorCallBack?.(promise));

    return (await promise).succeeded;
  }
}
