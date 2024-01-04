import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(
    private httpClient: HttpClient,
    @Inject('baseUrl') private baseUrl: string
  ) {}

  private createUrl(requestParameters: Partial<RequestParameters>) {
    return `${requestParameters.baseUrl ?? this.baseUrl}/${
      requestParameters.controller
    }${requestParameters.action ? `/${requestParameters.action}` : ''}`;
  }

  get<T>(
    requestParameters: Partial<RequestParameters>,
    id?: string
  ): Observable<T> {
    let url = '';
    if (requestParameters.fullEndPoint) {
      url = requestParameters.fullEndPoint;
    } else {
      url = `${this.createUrl(requestParameters)}${id ? `/${id}` : ''}${
        requestParameters.queryString ? `?${requestParameters.queryString}` : ''
      }`;
    }

    return this.httpClient.get<T>(url, { headers: requestParameters.headers });
  }

  post<T>(
    requestParameters: Partial<RequestParameters>,
    body: T
  ): Observable<T> {
    let url = '';
    if (requestParameters.fullEndPoint) {
      url = requestParameters.fullEndPoint;
    } else {
      url = `${this.createUrl(requestParameters)}${
        requestParameters.queryString ? `?${requestParameters.queryString}` : ''
      }`;
    }
    return this.httpClient.post<T>(url, body, {
      headers: requestParameters.headers,
    });
  }

  put<T>(
    requestParameters: Partial<RequestParameters>,
    body: T
  ): Observable<T> {
    let url = '';
    if (requestParameters.fullEndPoint) {
      url = requestParameters.fullEndPoint;
    } else {
      url = `${this.createUrl(requestParameters)}${
        requestParameters.queryString ? `?${requestParameters.queryString}` : ''
      }`;
    }
    return this.httpClient.put<T>(url, body, {
      headers: requestParameters.headers,
    });
  }

  delete<T>(
    requestParameters: Partial<RequestParameters>,
    id?: string
  ): Observable<T> {
    let url = '';
    if (requestParameters.fullEndPoint) {
      url = requestParameters.fullEndPoint;
    } else {
      url = `${this.createUrl(requestParameters)}${id ? `/${id}` : ''}${
        requestParameters.queryString ? `?${requestParameters.queryString}` : ''
      }`;
    }

    return this.httpClient.delete<T>(url, {
      headers: requestParameters.headers,
    });
  }
}

export class RequestParameters {
  baseUrl?: string;
  controller?: string;
  action?: string;
  headers?: HttpHeaders;
  queryString?: string;
  fullEndPoint?: string;
}
