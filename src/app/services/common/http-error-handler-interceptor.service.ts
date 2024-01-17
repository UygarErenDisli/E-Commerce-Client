import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, retry, throwError, timer } from 'rxjs';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../alerts/customtoastr.service';

export const MaxReties = 3;
export const DelayMs = 2000;

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
  constructor(private router: Router, private toastr: CustomToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry({
        count: MaxReties,
        delay: (
          retryError: HttpErrorResponse,
          retryAttempt: number
        ): Observable<number> => {
          if (retryAttempt + 1 > MaxReties || retryError.status !== 500) {
            return throwError(() => retryError);
          }
          this.toastr.message(
            `Retry Attempt ${retryAttempt}: retrying in ${
              (retryAttempt * DelayMs) / 1000
            } seconds`,
            'Unable To Connect to Server!',
            {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.TopCenter,
            }
          );
          return timer(retryAttempt * DelayMs);
        },
      }),
      catchError((error) => {
        switch (error.status) {
          case HttpStatusCode.Unauthorized:
            this.router.navigate(['login']);
            this.toastr.message(
              'You are not authorized to perform this action!',
              'Unauthorized!',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopLeft,
              }
            );
            break;
          case HttpStatusCode.InternalServerError:
            this.toastr.message('Server unreachable!', 'Server error!', {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopLeft,
            });
            break;
          case HttpStatusCode.BadRequest:
            this.toastr.message('Invalid request made!', 'Invalid request!', {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.TopRight,
            });
            break;
          case HttpStatusCode.NotFound:
            this.toastr.message(
              'Sorry,the page you were looking for could not be found',
              "That page doest't exist!",
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopRight,
              }
            );
            setTimeout(() => {
              this.router.navigate(['']);
            }, 3000);
            break;
          default:
            this.toastr.message('An unexpected error has occurred!', 'Error!', {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.TopRight,
            });

            break;
        }

        return of(error);
      })
    );
  }
}