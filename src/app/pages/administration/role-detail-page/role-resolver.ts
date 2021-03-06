import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { first } from 'rxjs/operators';

import { Role } from '../../../shared/data-access/models/role';
import { RoleService } from '../../../shared/data-access/services/role.service';

@Injectable()
export class RoleResolver implements Resolve<Promise<Role>> {
    constructor(private _roleService: RoleService) { }

    async resolve(route: ActivatedRouteSnapshot) {
        const key = route.params.roleKey;
        return await this._roleService.getByKey(key).pipe(first()).toPromise();
    }
}