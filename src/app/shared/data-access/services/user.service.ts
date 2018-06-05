import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot, Action } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _db: AngularFirestore) { }

  getByEmail(email: string) {
    return this._db.collection('users').doc(email).snapshotChanges().pipe(
      map<any, User>(snapshot => ({ email: snapshot.payload.id, ...snapshot.payload.data() }))
    );
  }
}
