import * as admin from 'firebase-admin';

import { Role } from '../models/role';

export class RoleRepository {
    static findAll() {
        return new Promise<_.Dictionary<Role>>((resolve, reject) => {
            admin.database().ref('roles').on('value', snapshots => {
                const val = snapshots.val();
                resolve(val);
            });
        });
    }
}