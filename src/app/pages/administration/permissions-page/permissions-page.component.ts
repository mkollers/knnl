import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Role } from '../../../shared/data-access/models/role';
import { RoleService } from '../../../shared/data-access/services/role.service';
import { ToolbarService } from '../../../shared/layout/services/toolbar.service';
import { CreateRoleDialogComponent } from '../../../shared/role/dialogs/create-role-dialog/create-role-dialog.component';

@Component({
  selector: 'app-permissions-page',
  templateUrl: './permissions-page.component.html',
  styleUrls: ['./permissions-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionsPageComponent {
  roles: Role[];

  constructor(
    private _dialog: MatDialog,
    private _roleService: RoleService,
    private _router: Router,
    route: ActivatedRoute,
    title: Title,
    toolbar: ToolbarService
  ) {
    title.setTitle('Rollen und Berechtigungen');
    toolbar.title = 'Rollen und Berechtigungen';
    toolbar.navigateBackUri = '';

    this.roles = route.snapshot.data['roles'];
  }

  async create() {
    const dialogRef = this._dialog.open<CreateRoleDialogComponent, any, Role>(CreateRoleDialogComponent, {
      minWidth: '300px',
      maxWidth: '450px',
      disableClose: true
    });

    const role = await dialogRef.beforeClose().toPromise();

    if (role) {
      const $key = await this._roleService.create(role);
      this._router.navigate([$key]);
    }
  }
}
