import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { map, skip, switchMap, tap } from 'rxjs/operators';

import { Role } from '../../../shared/data-access/models/role';
import { RoleService } from '../../../shared/data-access/services/role.service';
import { ToolbarService } from '../../../shared/layout/services/toolbar.service';
import { PermissionChange } from '../../../shared/role/components/role-details/permission-change';

@Component({
  selector: 'knnl-role-detail-page',
  templateUrl: './role-detail-page.component.html',
  styleUrls: ['./role-detail-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleDetailPageComponent {
  role$: Observable<Role>;

  constructor(
    private _roleService: RoleService,
    route: ActivatedRoute,
    router: Router,
    title: Title,
    toolbar: ToolbarService
  ) {
    const role$ = route.data.pipe(map(data => data.role as Role));
    const key$ = route.params.pipe(map(params => params['roleKey']));
    const hotRole$ = key$.pipe(
      switchMap(id => this._roleService.getByKey(id)),
      skip(1) // first values is emmitted by resolver
    );

    this.role$ = merge(role$, hotRole$).pipe(
      tap(role => toolbar.title = role.name),
      tap(role => title.setTitle(role.name))
    );

    const urlTree = router.createUrlTree(['../'], { relativeTo: route.parent });
    toolbar.navigateBackUri = urlTree.toString();
  }

  async onPermissionChange(role: Role, $event: PermissionChange) {
    if ($event.selected) {
      await this._roleService.addPermission(role.$key, $event.permission);
    } else {
      await this._roleService.removePermission(role.$key, $event.permission);
    }
  }
}
