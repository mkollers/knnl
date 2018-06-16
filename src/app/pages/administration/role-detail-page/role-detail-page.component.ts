import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

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
  role: Role;

  constructor(
    private _roleService: RoleService,
    route: ActivatedRoute,
    router: Router,
    title: Title,
    toolbar: ToolbarService
  ) {
    this.role = route.snapshot.data['role'];

    const urlTree = router.createUrlTree(['../'], { relativeTo: route.parent });
    toolbar.navigateBackUri = urlTree.toString();
    toolbar.title = this.role.name;
    title.setTitle(this.role.name);
  }

  async onPermissionChange($event: PermissionChange) {
    if ($event.selected) {
      await this._roleService.addPermission(this.role.$key, $event.permission);
    } else {
      await this._roleService.removePermission(this.role.$key, $event.permission);
    }
  }
}
