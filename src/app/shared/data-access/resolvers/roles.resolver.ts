import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { Role } from '../models/role';
import { RoleService } from '../services/role.service';

@Injectable()
export class RolesResolver implements Resolve<Observable<Role[]>> {
    constructor(private _roleService: RoleService) { }

    resolve() {
        return this._roleService.getAll().pipe(first());
    }
}