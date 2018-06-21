import { Injectable } from '@angular/core';
import { AngularFireAction, AngularFireDatabase, DatabaseSnapshot } from 'angularfire2/database';
import { map } from 'rxjs/operators';

import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _db: AngularFireDatabase) { }

  create(role: Role): PromiseLike<string> {
    return this._db.list<Role>('roles').push(role).then(ref => ref.key);
  }

  delete(key: string) {
    return this._db.list<Role>(`roles/${key}`).remove();
  }

  update($key: string, role: Role) {
    return this._db.object<Role>(`roles/${$key}`).update(role);
  }

  getAll() {
    return this._db.list<Role[]>('roles', ref => ref.orderByChild('name')).snapshotChanges().pipe(
      map<AngularFireAction<DatabaseSnapshot<any>>[], Role[]>(actions => actions.map<Role>(action => {
        return Role.fromAction(action);
      }))
    );
  }

  getByKey(key: string) {
    return this._db.object<Role>(`roles/${key}`).snapshotChanges().pipe(
      map<AngularFireAction<DatabaseSnapshot<Role>>, Role>(action => Role.fromAction(action))
    );
  }

  addPermission($key: string, permission: string) {
    return this._db.object<boolean>(`roles/${$key}/permissions/${permission}`).set(true);
  }

  removePermission($key: string, permission: string) {
    return this._db.object<boolean>(`roles/${$key}/permissions/${permission}`).remove();
  }
}
