import { Injectable } from '@angular/core';
import { HttpClientService } from './httpclient.service';
import { Observable, firstValueFrom } from 'rxjs';
import { BaseUrl } from '../../contracts/files/base-url';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private httpClient: HttpClientService) {}

  async getBaseUrl(): Promise<BaseUrl> {
    const observable: Observable<BaseUrl> = this.httpClient.get<BaseUrl>({
      controller: 'files',
      action: 'GetBaseStorageUrl',
    });

    return (await firstValueFrom(observable)) as BaseUrl;
  }
}
