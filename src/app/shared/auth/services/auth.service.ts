import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { Dictionary } from '../../../../../functions/node_modules/@types/lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState$: Observable<firebase.User>;
  claims$: Observable<Dictionary<any>>;

  constructor(
    private _auth: AngularFireAuth,
    db: AngularFireDatabase
  ) {
    this.authState$ = _auth.authState;
    this.claims$ = _auth.idTokenResult.pipe(
      filter(token => !!token),
      map(token => token.claims)
    );

    this.authState$.pipe(
      filter(user => !!user),
      switchMap(user => db.object<number>(`metadata/${user.uid}/refreshTime`).valueChanges()),
      tap(() => this._auth.auth.currentUser.getIdToken(true))
    ).subscribe();
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
