import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../httpclient.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../alerts/customtoastr.service';
import { DialogService } from '../dialog.service';
import {
  FileUploadDialogComponent,
  FileUploadState,
} from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {
  SpinnerComponent,
  SpinnerType,
} from '../../../base/spinner/spinner.component';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent extends SpinnerComponent {
  public files: NgxFileDropEntry[] = [];

  constructor(
    spinner: NgxSpinnerService,
    private httpClient: HttpClientService,
    private toastr: CustomToastrService,
    private dialogService: DialogService
  ) {
    super(spinner);
  }

  @Input() options!: Partial<FileUploadOptions>;

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const droppedFile of files) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        fileData.append(file.name, file, droppedFile.relativePath);
      });
    }

    this.dialogService.openDialog({
      component: FileUploadDialogComponent,
      data: FileUploadState.Yes,
      afterClosed: () => {
        this.showSpinner(SpinnerType.BallSpin);
        this.httpClient
          .post(
            {
              controller: this.options.controller,
              action: this.options.action,
              queryString: this.options.queryString,
              headers: new HttpHeaders({ responseType: 'blob' }),
            },
            fileData
          )
          .subscribe({
            complete: () => {
              this.hideSpinner(SpinnerType.BallSpin);
              files.length = 0;
              this.toastr.message('Files uploaded successfully', 'Success', {
                messageType: ToastrMessageType.Success,
                position: ToastrPosition.TopRight,
              });
            },
            error: (errorResponse: HttpErrorResponse) => {
              this.hideSpinner(SpinnerType.BallSpin);
              this.toastr.message(
                'An unexpected error was encountered',
                'Error',
                {
                  messageType: ToastrMessageType.Error,
                  position: ToastrPosition.TopRight,
                }
              );
            },
          });
      },
    });
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  acceptedType?: string;
  explanation?: string;
}
