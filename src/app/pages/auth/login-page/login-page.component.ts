import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/auth/services/auth.service';
import { NotificationService } from '../../../shared/notification/services/notification.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginFg: FormGroup;
  inProgress = false;

  constructor(
    private _authService: AuthService,
    private _notificationService: NotificationService,
    private _router: Router,
    fb: FormBuilder,
    title: Title
  ) {
    title.setTitle('Anmelden');

    this.loginFg = fb.group({
      email: fb.control('', [Validators.required, Validators.email]),
      password: fb.control('', Validators.required)
    });
  }

  async login() {
    this.inProgress = true;

    const email = this.loginFg.value.email;
    const password = this.loginFg.value.password;

    try {
      await this._authService.login(email, password);
      await this._router.navigateByUrl('/');
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
          this._notificationService.error('Unbekannter Nutzer', 'Diese E-Mail Adresse ist uns leider nicht bekannt.');
          break;
        default:
          this._notificationService.fatal(err);
          break;
      }
    }
    this.inProgress = false;
  }
}
