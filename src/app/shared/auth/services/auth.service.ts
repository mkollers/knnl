import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import { PersonalData } from '../models/personal-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _auth: AngularFireAuth,
    private _db: AngularFirestore
  ) { }

  async register(mail: string, password: string) {
    await this._db.collection('users').doc(mail).set({}, { merge: true });
    await this._auth.auth.createUserWithEmailAndPassword(mail, password);
  }

  async setPersonalData(value: PersonalData) {
    const mail = this._auth.auth.currentUser.email;
    await this._db.collection('users').doc(mail).set(value, { merge: true });
  }

  async setDataProtection(key: string, value: boolean) {
    const mail = this._auth.auth.currentUser.email;
    await this._db.collection('users').doc(mail).set({
      dataProtection: {
        [key]: value
      }
    }, { merge: true });
  }

  async login(email: string, password: string) {
    await this._auth.auth.signInWithEmailAndPassword(email, password);
  }
}
