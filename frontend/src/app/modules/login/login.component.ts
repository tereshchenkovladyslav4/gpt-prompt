import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, CommonService, FormValidationService, UserApiService } from '@services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  submitted: boolean = false;
  passwordVisibility: boolean = false;
  loginForm: FormGroup;
  forgotForm: FormGroup;
  forgotMode: boolean = false;

  constructor(
    private userApiService: UserApiService,
    private authService: AuthService,
    private fb: FormBuilder,
    private formValidationService: FormValidationService,
    private location: Location,
    private router: Router,
    private snackBar: MatSnackBar,
    public commonService: CommonService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, this.formValidationService.isBlank]],
      password: ['', Validators.required],
    });
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, this.formValidationService.isBlank, Validators.email]],
    });
  }

  ngOnInit() {}

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
    this.userApiService.userLogin(this.loginForm.value).subscribe((res) => {
      this.submitted = false;
      if (!res.success) {
        this.snackBar.open(res.message?.[0] || '', 'Dismiss', { duration: 4000 });
        return;
      }
      if (res.result) {
        this.authService.setToken(res.result);
        this.goBack();
      }
    });
  }

  private forgotPassword() {
    this.userApiService.forgotPassword(this.forgotForm.value).subscribe((res) => {
      if (!res.success) {
        this.snackBar.open(res.message?.[0] || '', 'Dismiss', { duration: 4000 });
        return;
      }
      this.goBack();
    });
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
    this.location.back();
  }
}
