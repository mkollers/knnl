import { AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';
import { Dictionary } from 'lodash';

export class Role {
    $key: string;
    name: string;
    description: string;
    permissions: Dictionary<boolean>;

    static fromAction(action: AngularFireAction<DatabaseSnapshot<any>>): Role {
        const val = action.payload.val();
        return {
            $key: action.key,
            name: val.name,
            description: val.description,
            permissions: val.permissions || {}
        };
    }
}