import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';
import { Role } from '../models/role';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _db: AngularFireDatabase) { }

  create(role: Role) {
    return this._db.list<Role>('roles').push(role).then(ref => ref.key);
  }

  getAll() {
    return this._db.list<Role[]>('roles').snapshotChanges().pipe(
      map<AngularFireAction<DatabaseSnapshot<Role[]>>[], Role[]>(snapshots => snapshots.map<any>(snapshot => {
        return { $key: snapshot.payload.key, ...snapshot.payload.val() };
      }))
    );
  }
}
