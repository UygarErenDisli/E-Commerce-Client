import { Inject, Injectable } from '@angular/core';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { _CoalescedStyleScheduler } from '@angular/cdk/table';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  constructor(@Inject('domainUrl') private domainUrl: string) {}

  start(hubUrl: string) {
    hubUrl = this.domainUrl + hubUrl;

    const builder: HubConnectionBuilder = new HubConnectionBuilder();

    const hubConnection = builder
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    hubConnection
      .start()
      .then((value) => {
        console.log('Connection successfully connectted');
      })
      .catch((error) => {
        setTimeout(() => {
          this.start(hubUrl);
        }, 2000);
      });

    hubConnection.onreconnected((connectionId) => {
      console.log('Connection successfully reconnectted');
    });

    return hubConnection;
  }
  invoke(
    hubUrl: string,
    methodName: string,
    message: any,
    successCallBack?: (value: any) => void,
    errorCallBack?: (error: any) => void
  ) {
    this.start(hubUrl)
      .invoke(methodName, message)
      .then(successCallBack)
      .catch(errorCallBack);
  }

  on(
    hubUrl: string,
    methodName: string,
    callBack: (...message: any[]) => void
  ) {
    this.start(hubUrl).on(methodName, callBack);
  }
}
