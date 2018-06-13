import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';
import { Role } from '../models/role';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _db: AngularFireDatabase) { }

  getAll() {
    return this._db.object<Role[]>('roles').snapshotChanges().pipe(
      map<AngularFireAction<DatabaseSnapshot<Role[]>>, Role[]>(snapshot => ({ name: snapshot.payload.key, ...snapshot.payload.val() }))
    );
  }
}
