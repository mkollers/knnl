import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { first } from 'rxjs/operators';

import { User } from '../../../shared/data-access/models/user';
import { UserService } from '../../../shared/data-access/services/user.service';

@Injectable()
export class UserResolver implements Resolve<Promise<User>> {
    constructor(private _userService: UserService) { }

    async resolve(route: ActivatedRouteSnapshot) {
        const key = route.params.uid;
        return await this._userService.getByUid(key).pipe(first()).toPromise();
    }
}