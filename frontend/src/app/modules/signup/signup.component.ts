import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService, DialogService, FormValidationService, UserApiService } from '@services';
import { AlertDialogComponent } from '@shared';
import { DialogType } from '@enums';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  submitted: boolean = false;
  passwordVisibility: boolean = false;
  form: FormGroup;

  constructor(
    private dialogService: DialogService,
    private fb: FormBuilder,
    private formValidationService: FormValidationService,
    private snackBar: MatSnackBar,
    private userApiService: UserApiService,
    public commonService: CommonService,
  ) {
    this.form = this.fb.group({
      accept: false,
      firstName: ['', [Validators.required, this.formValidationService.isBlank]],
      lastName: ['', [Validators.required, this.formValidationService.isBlank]],
      email: ['', [Validators.required, this.formValidationService.isBlank, Validators.email]],
      password: ['', [Validators.required, this.formValidationService.isBlank, Validators.minLength(8)]],
      confirmPassword: [
        '',
        [Validators.required, this.formValidationService.isBlank, this.formValidationService.arePasswordsMismatching],
      ],
    });
  }

  ngOnInit() {}

  checkError(form: FormGroup, field: string, error: string | string[]) {
    return this.formValidationService.checkError(form, field, error);
  }

  togglePasswordVisibility(event: TouchEvent | MouseEvent) {
    if (event.type === 'mouseleave' && !this.passwordVisibility) {
      return event.preventDefault();
    }
    this.passwordVisibility = !this.passwordVisibility;
    return event.preventDefault();
  }

  submitForm() {
    if (this.form.valid) {
      this.submitted = true;
      this.userApiService.signup(this.form.value).subscribe((res) => {
        this.submitted = false;
        if (!res.success) {
          this.snackBar.open(res.message?.[0] || '', 'Dismiss', { duration: 4000 });
          return;
        }
        this.dialogService
          .open(AlertDialogComponent, {
            data: {
              title: 'Welcome, ' + res.result?.firstName + ', your registration was successful.',
              comment:
                'An email with further instructions on how to verify your account was sent to you, check your inbox!',
              dialogType: DialogType.ALERT,
            },
            width: '400px',
          })
          .afterClosed()
          .subscribe(() => {
            this.commonService.goHome();
          });
      });
    }
  }
}
