import { Dictionary, chain } from 'lodash';

import { Role } from '../../../data-access/models/role';
import { User } from '../../../data-access/models/user';
import { toArray } from 'rxjs/operators';

export class UserTableViewModel {
    uid: string;
    created: string;
    firstname: string;
    lastname: string;
    email: string;
    roles: string[];

    constructor(roles: Dictionary<Role>, user: User) {
        this.uid = user.uid;
        this.created = user.created;
        this.email = user.email;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        if (user.roles) {
            this.roles = chain(user.roles)
            .keys()
            .filter(key => !!roles[key])
            .map(key => roles[key].name)
            .value();
        }
    }
}