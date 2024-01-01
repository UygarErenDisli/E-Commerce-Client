import { NgxSpinnerService } from 'ngx-spinner';

export class SpinnerComponent {
  constructor(private spinner: NgxSpinnerService) {}

  showSpinner(spinnerType: SpinnerType) {
    this.spinner.show(spinnerType);

    setTimeout(() => {
      this.spinner.hide(spinnerType);
    }, 2000);
  }

  hideSpinner(spinnerType: SpinnerType) {
    this.spinner.hide(spinnerType);
  }
}

export enum SpinnerType {
  BallCLipRotate = 'ballClipRotate',
  BallScaleMultiple = 'ballScaleMultiple',
  BallSpin = 'ballSpin',
}
