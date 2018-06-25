import * as admin from 'firebase-admin';
import { User } from '../models/user';

export class UserRepository {
    static findAll() {
        return new Promise<_.Dictionary<User>>((resolve, reject) => {
            admin.database().ref('users').on('value', snapshots => {
                const val = snapshots.val();
                resolve(val);
            });
        });
    }
}