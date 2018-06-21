import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { first } from 'rxjs/operators';

import { User } from '../../../shared/data-access/models/user';
import { UserService } from '../../../shared/data-access/services/user.service';

@Injectable()
export class UsersResolver implements Resolve<Promise<User[]>> {
    constructor(private _userService: UserService) { }

    async resolve() {
        return await this._userService.getAll().pipe(first()).toPromise();
    }
}