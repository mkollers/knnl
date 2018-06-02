import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/auth/services/auth.service';
import { ErrorResponse } from '../../shared/notification/models/error-response';
import { NotificationService } from '../../shared/notification/services/notification.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginFg: FormGroup;

  constructor(
    private _authService: AuthService,
    private _notificationService: NotificationService,
    private _router: Router,
    fb: FormBuilder
  ) {
    this.loginFg = fb.group({
      email: fb.control('', [Validators.required, Validators.email]),
      password: fb.control('', Validators.required)
    });
  }

  async login() {
    const email = this.loginFg.value.email;
    const password = this.loginFg.value.password;

    try {
      await this._authService.login(email, password);
      await this._router.navigateByUrl('/');
    } catch (err) {
      this._notificationService.fatal(new ErrorResponse(err));
    }
  }

}
