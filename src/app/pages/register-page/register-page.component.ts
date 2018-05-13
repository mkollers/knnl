import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatchValidator } from './validators/match-validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  fg: FormGroup;

  constructor(fb: FormBuilder) {
    this.fg = fb.group({
      email: fb.control('', [Validators.required, Validators.email]),
      passwords: fb.group({
        password: fb.control('', [Validators.required, Validators.minLength(6)]),
        repeat: fb.control('')
      }, { validator: MatchValidator }),
      dob: fb.control('', Validators.required),
      hideDoB: fb.control(false),
      firstname: fb.control('', Validators.required),
      lastname: fb.control('', Validators.required),
      favoriteTeams: fb.control('', Validators.required),
      interests: fb.control(''),
      mobile: fb.control('')
    });
  }

  ngOnInit() {
  }

  register(registration: any) {

  }
}
