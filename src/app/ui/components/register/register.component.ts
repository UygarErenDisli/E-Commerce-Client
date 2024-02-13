import {
  ToastrMessageType,
  ToastrPosition,
} from './../../../services/alerts/customtoastr.service';
import {
  SpinnerType,
  SpinnerComponent,
} from './../../../base/spinner/spinner.component';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { User } from '../../../entities/user/user';
import { UserService } from '../../../services/common/models/user.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { CreateUser } from '../../../contracts/user/create-user';
import { CustomToastrService } from '../../../services/alerts/customtoastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export default class RegisterComponent
  extends SpinnerComponent
  implements OnInit
{
  constructor(
    spinner: NgxSpinnerService,
    private userService: UserService,
    private toastr: CustomToastrService,
    private router: Router
  ) {
    super(spinner);
  }

  get component() {
    return this.registerForm?.controls;
  }
  submitted: boolean = false;
  registerForm?: FormGroup;
  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        nameSurname: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
        userName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        passwordConfirm: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }
  passwordMatchValidator(control: AbstractControl) {
    return control.get('password')?.value ===
      control.get('passwordConfirm')?.value
      ? null
      : { notSame: true };
  }

  async onSubmit(user: User) {
    this.submitted = true;
    if (this.registerForm?.invalid) {
      return;
    }
    this.showSpinner(SpinnerType.BallSpin);
    const result: CreateUser = await this.userService.createUser(user);

    if (result.succeeded) {
      this.hideSpinner(SpinnerType.BallSpin);
      this.toastr.message('Registered Successfully', 'Success', {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight,
      });

      setTimeout(() => {
        this.router.navigate(['login']);
      }, 1000);
    } else {
      this.hideSpinner(SpinnerType.BallSpin);
      this.toastr.message(result.message!, 'Error', {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight,
      });
    }
  }

  protected validate(componentName: string, validationName: string) {
    return this.component?.[componentName]?.errors?.[validationName];
  }
}
