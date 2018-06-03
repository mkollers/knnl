import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/auth/services/auth.service';
import { NotificationService } from '../../shared/notification/services/notification.service';
import { MatchValidator } from './validators/match-validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  accountFg: FormGroup;
  personalFg: FormGroup;
  dataProtFg: FormGroup;
  inProgress = false;

  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _notificationService: NotificationService,
    private _router: Router,
    title: Title
  ) {
    title.setTitle('Konto erstellen');
    this.initFormGroups();
  }

  async finish() {
    this.inProgress = true;

    try {
      const email = this.accountFg.value.email;
      const password = this.accountFg.value.passwords.password;
      const personalData = this.personalFg.value;
      const dataProtection = this.dataProtFg.value;

      await this._authService.register(email, password);
      await this._authService.setPersonalData(personalData);

      for (const key in dataProtection) {
        if (!dataProtection.hasOwnProperty(key)) {
          continue;
        }

        const value = dataProtection[key] as boolean;
        await this._authService.setDataProtection(key, value);
        await this._router.navigateByUrl('/');
      }
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          this._notificationService.error('Bereits vergeben', 'Diese E-Mail Adresse wird bereits von einem anderen Account verwendet');
          break;
        default:
          this._notificationService.fatal(err);
          break;
      }
    }

    this.inProgress = false;
  }

  private initFormGroups() {
    this.accountFg = this._fb.group({
      email: this._fb.control('', [Validators.required, Validators.email]),
      passwords: this._fb.group({
        password: this._fb.control('', [Validators.required, Validators.minLength(6)]),
        repeat: this._fb.control('')
      }, { validator: MatchValidator })
    });

    this.personalFg = this._fb.group({
      dob: this._fb.control(''),
      firstname: this._fb.control('', Validators.required),
      lastname: this._fb.control('', Validators.required),
      favoriteTeams: this._fb.control(''),
      interests: this._fb.control(''),
      mobile: this._fb.control('')
    });

    this.dataProtFg = this._fb.group({
      news: this._fb.control(false),
      newPost: this._fb.control(false),
      reply: this._fb.control(false),
      results: this._fb.control(false),
      whatsApp: this._fb.control(false),
      whatsAppGroup: this._fb.control(false)
    });
  }
}
