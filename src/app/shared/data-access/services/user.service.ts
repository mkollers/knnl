import { Injectable } from '@angular/core';
import { AngularFireAction, AngularFireDatabase, DatabaseSnapshot } from 'angularfire2/database';
import { isMoment, Moment } from 'moment';
import { map, tap } from 'rxjs/operators';

import { PersonalData } from '../../auth/models/personal-data';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _db: AngularFireDatabase) { }

  getAll() {
    return this._db.list<User>('users', ref => ref.orderByChild('email')).snapshotChanges().pipe(
      map<AngularFireAction<DatabaseSnapshot<any>>[], User[]>(actions => actions.map(action => User.fromAction(action)))
    );
  }

  getByUid(uid: string) {
    return this._db.object<User>(`users/${uid}`).snapshotChanges().pipe(
      map<AngularFireAction<DatabaseSnapshot<User>>, User>(action => User.fromAction(action))
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
