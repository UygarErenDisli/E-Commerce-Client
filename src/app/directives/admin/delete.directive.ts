import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { HttpClientService } from '../../services/common/httpclient.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../services/alerts/customtoastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/spinner/spinner.component';
import $ from 'jquery';
import { HttpErrorResponse } from '@angular/common/http';
import {
  DeleteDialogComponent,
  DeleteState,
} from '../../dialogs/delete-dialog/delete-dialog.component';
import { DialogService } from '../../services/common/dialog.service';
import { firstValueFrom } from 'rxjs';

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClient: HttpClientService,
    private spinner: NgxSpinnerService,
    private alertService: CustomToastrService,
    private dialogService: DialogService
  ) {
    const img = _renderer.createElement('img');
    img.setAttribute('src', '../../../../../assets/delete_icon2.png');
    img.setAttribute('style', 'cursor:pointer');
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id!: string;
  @Input() controller!: string;
  @Input() itemName: string = '';

  @Output() callBack: EventEmitter<any> = new EventEmitter();

  @HostListener('click')
  onClick() {
    this.dialogService.openDialog({
      component: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallSpin);
        const observable = this.httpClient.delete(
          {
            controller: this.controller,
          },
          this.id
        );
        const promise = firstValueFrom(observable);
        promise
          .then((_) => {
            const td: HTMLTableCellElement = this.element.nativeElement;
            $(td.parentElement!).fadeOut(1000, () => {
              this.callBack.emit();
              this.spinner.hide(SpinnerType.BallSpin);
              this.alertService.message(
                `${this.itemName} Deleted Successfully`,
                'Success',
                {
                  messageType: ToastrMessageType.Success,
                  position: ToastrPosition.TopRight,
                }
              );
            });
          })
          .catch((error: any) => {
            const td: HTMLTableCellElement = this.element.nativeElement;
            this.spinner.hide(SpinnerType.BallSpin);
            $(td.parentElement!).fadeIn(300);
            this.alertService.message(
              'An unexpected error was encountered while deleting',
              'Error',
              {
                messageType: ToastrMessageType.Error,
                position: ToastrPosition.TopRight,
              }
            );
          });
        await promise;
      },
    });
  }
}
