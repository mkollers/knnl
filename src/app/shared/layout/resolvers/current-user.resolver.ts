import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap, first, filter } from 'rxjs/operators';

import { AuthService } from '../../../shared/auth/services/auth.service';
import { User } from '../../../shared/data-access/models/user';
import { UserService } from '../../../shared/data-access/services/user.service';

@Injectable()
export class CurrentUserResolver implements Resolve<Observable<User>> {
    constructor(
        private _authService: AuthService,
        private _userService: UserService
    ) { }

    resolve() {
        return this._authService.authState$.pipe(
            filter(auth => !!auth),
            first(),
            switchMap(user => !user ? of(null) : this._userService.getByUid(user.uid)),
            first()
        );
    }
}