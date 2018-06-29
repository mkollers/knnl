import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from 'firebase/app';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState$: Observable<User>;

  constructor(
    private _auth: AngularFireAuth,
    db: AngularFireDatabase
  ) {
    this.authState$ = _auth.authState;

    this.authState$.pipe(
      filter(user => !!user),
      switchMap(user => db.object<number>(`metadata/${user.uid}/refreshTime`).valueChanges()),
      tap(console.log),
      tap(() => this._auth.auth.currentUser.getIdToken())
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
