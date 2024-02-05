import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpclient.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Menu } from '../../../contracts/application/menu';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor(private httpClient: HttpClientService) {}

  async getAllApplicationEndpoints(
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: any) => void
  ): Promise<Menu[]> {
    const observable: Observable<Menu[]> = this.httpClient.get<Menu[]>({
      controller: 'ApplicationServices',
    });

    const promise = firstValueFrom(observable);
    promise
      .then((_) => {
        successCallBack?.();
      })
      .catch((errorMessage) => errorCallBack?.(errorMessage));
    return await promise;
  }
}
