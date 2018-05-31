import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

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

  constructor(
    private _fb: FormBuilder,
    title: Title
  ) {
    title.setTitle('Konto erstellen');
    this.initFormGroups();
  }

  finish() {

  }

  private initFormGroups() {
    this.accountFg = this._fb.group({
      email: this._fb.control('', [Validators.required, Validators.email]),
      passwords: this._fb.group({
        password: this._fb.control('', [Validators.required, Validators.minLength(6)]),
        repeat: this._fb.control('')
      }, { validator: MatchValidator }),
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
