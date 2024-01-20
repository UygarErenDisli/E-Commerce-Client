import { fileURLToPath } from 'node:url';
import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import { _CoalescedStyleScheduler } from '@angular/cdk/table';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private _connection: HubConnection | undefined;

  get connection(): HubConnection | undefined {
    return this._connection;
  }

  constructor() {}

  start(hubUrl: string) {
    if (
      !this.connection ||
      this.connection.state === HubConnectionState.Disconnected
    ) {
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

      this._connection = hubConnection;

      this._connection.onreconnected((connectionId) => {
        console.log('Connection successfully reconnectted');
      });
    }
  }
  invoke(
    methodName: string,
    message: any,
    successCallBack?: (value: any) => void,
    errorCallBack?: (error: any) => void
  ) {
    this.connection
      ?.invoke(methodName, message)
      .then(successCallBack)
      .catch(errorCallBack);
  }

  on(methodName: string, callBack: (...message: any[]) => void) {
    this.connection?.on(methodName, callBack);
  }
}
