import { Dictionary } from 'lodash';

import { Role } from '../../../data-access/models/role';
import { User } from '../../../data-access/models/user';

export class UserTableViewModel {
    firstname: string;
    lastname: string;
    email: string;
    roles: string[];

    constructor(roles: Dictionary<Role>, user: User) {
        this.email = user.email;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        if (user.roles) {
            this.roles = user.roles.map(key => roles[key].name);
        }
    }
}