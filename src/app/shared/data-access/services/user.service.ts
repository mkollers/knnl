import { Injectable } from '@angular/core';
import { AngularFireDatabase, DatabaseSnapshot, AngularFireAction } from 'angularfire2/database';
import { map } from 'rxjs/operators';

import { PersonalData } from '../../auth/models/personal-data';
import { User } from '../models/user';
import { isMoment, Moment } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _db: AngularFireDatabase) { }

  getByUid(uid: string) {
    return this._db.object<User>(`users/${uid}`).snapshotChanges().pipe(
      map<AngularFireAction<DatabaseSnapshot<User>>, User>(snapshot => ({ uid: snapshot.payload.key, ...snapshot.payload.val() }))
    );
  }

  async setPersonalData(uid: string, value: PersonalData) {
    if (value.dob instanceof Date) {
      value.dob = value.dob.getTime();
    } else if (isMoment(value.dob)) {
      value.dob = (value.dob as Moment).unix();
    }

    await this._db.object(`users/${uid}`).update(value);
  }

  async setDataProtection(uid: string, key: string, value: boolean) {
    await this._db.object(`users/${uid}/dataProtection`).update({
      [key]: value
    });
  }
}
