import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, FormValidationService, UserApiService } from '@services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  passwordVisibility: boolean = false;
  loginForm: FormGroup;
  forgotForm: FormGroup;
  forgotMode: boolean = false;
  returnUrl: string = '/';

  constructor(
    private userApiService: UserApiService,
    private authService: AuthService,
    private fb: FormBuilder,
    private formValidationService: FormValidationService,
    private location: Location,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, this.formValidationService.isBlank]],
      password: ['', Validators.required],
    });
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, this.formValidationService.isBlank, Validators.email]],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'] || '/';
    });
  }

  checkError(form: FormGroup, field: string, error: string | string[]) {
    return this.formValidationService.checkError(form, field, error);
  }

  togglePasswordVisibility(event: TouchEvent | MouseEvent) {
    if (!(event.type === 'mouseleave' && !this.passwordVisibility)) {
      this.passwordVisibility = !this.passwordVisibility;
    }
    return event.preventDefault();
  }

  private userLogin() {
    this.userApiService.userLogin(this.loginForm.value).subscribe(
      (res) => {
        this.submitted = false;
        if (!res.success) {
          this.snackBar.open(res.message?.[0] || '', 'Dismiss', { duration: 4000 });
          return;
        }
        if (res.result) {
          this.authService.setToken(res.result);
          this.goBack();
        }
      },
      (err: HttpErrorResponse) => {
        this.submitted = false;
        this.snackBar.open(err.message || '', 'Dismiss', { duration: 4000 });
      },
    );
  }

  private forgotPassword() {
    this.userApiService.forgotPassword(this.forgotForm.value).subscribe(
      (res) => {
        this.submitted = false;
        if (!res.success) {
          this.snackBar.open(res.message?.[0] || '', 'Dismiss', { duration: 4000 });
          return;
        }
        this.goBack();
      },
      (err: HttpErrorResponse) => {
        this.submitted = false;
        this.snackBar.open(err.message || '', 'Dismiss', { duration: 4000 });
      },
    );
  }

  toggleForgotMode() {
    this.forgotMode = !this.forgotMode;
  }

  submitForm() {
    const form = this.forgotMode ? this.forgotForm : this.loginForm;
    if (form.valid) {
      this.submitted = true;
      if (this.forgotMode) {
        this.forgotPassword();
      } else {
        this.userLogin();
      }
    }
  }

  goBack() {
    this.router.navigateByUrl(this.returnUrl);
  }
}
