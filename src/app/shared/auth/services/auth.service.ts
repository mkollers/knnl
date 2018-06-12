import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState$: Observable<User>;

  constructor(
    private _auth: AngularFireAuth
  ) {
    this.authState$ = _auth.authState;
  }

  register(mail: string, password: string) {
    return this._auth.auth.createUserWithEmailAndPassword(mail, password);
  }

  async login(email: string, password: string) {
    await this._auth.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this._auth.auth.signOut();
  }
}
