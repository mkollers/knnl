import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { first } from 'rxjs/operators';

import { Role } from '../../../shared/data-access/models/role';
import { RoleService } from '../../../shared/data-access/services/role.service';

@Injectable()
export class RolesResolver implements Resolve<Promise<Role[]>> {
    constructor(private _roleService: RoleService) { }

    async resolve() {
        return await this._roleService.getAll().pipe(first()).toPromise();
    }
}