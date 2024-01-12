import { SpinnerType } from './../../../base/spinner/spinner.component';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { User } from '../../../entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export default class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  get component() {
    return this.registerForm?.controls;
  }
  submitted: boolean = false;
  registerForm?: FormGroup;
  ngOnInit(): void {
    // this.registerForm = this.formBuilder.group(
    //   {
    //     nameSurname: [
    //       '',
    //       [
    //         Validators.required,
    //         Validators.maxLength(50),
    //         Validators.minLength(3),
    //       ],
    //     ],
    //     userName: [
    //       '',
    //       [
    //         Validators.required,
    //         Validators.maxLength(50),
    //         Validators.minLength(3),
    //       ],
    //     ],
    //     email: [
    //       '',
    //       [Validators.required, Validators.maxLength(50), Validators.email],
    //     ],
    //     password: ['', [Validators.required]],
    //     passwordConfirm: ['', [Validators.required]],
    //   },
    //   {
    //     validator: (group: AbstractControl): ValidationErrors | null => {
    //       let password = group.get('password')?.value;
    //       let passwordConfirm = group.get('passwordConfirm')?.value;
    //       return password === passwordConfirm ? null : { notSame: true };
    //     },
    //   }
    // );
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

  onSubmit(user: User) {
    this.submitted = true;
    if (this.registerForm?.invalid) {
      return;
    }
  }

  protected validate(componentName: string, validationName: string) {
    return this.component?.[componentName]?.errors?.[validationName];
  }
}
