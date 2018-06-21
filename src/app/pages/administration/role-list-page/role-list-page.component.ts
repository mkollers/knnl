import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { map, skip } from 'rxjs/operators';

import { Role } from '../../../shared/data-access/models/role';
import { RoleService } from '../../../shared/data-access/services/role.service';
import { ConfirmDialogData } from '../../../shared/helpers/dialogs/confirm-dialog/confirm-dialog-data';
import { ConfirmDialogComponent } from '../../../shared/helpers/dialogs/confirm-dialog/confirm-dialog.component';
import { ToolbarService } from '../../../shared/layout/services/toolbar.service';
import { CreateRoleDialogComponent } from '../../../shared/role/dialogs/create-role-dialog/create-role-dialog.component';
import { EditRoleDialogComponent } from '../../../shared/role/dialogs/edit-role-dialog/edit-role-dialog.component';

@Component({
  selector: 'knnl-role-list-page',
  templateUrl: './role-list-page.component.html',
  styleUrls: ['./role-list-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleListPageComponent {
  roles$: Observable<Role[]>;

  constructor(
    private _dialog: MatDialog,
    private _roleService: RoleService,
    private _router: Router,
    private _route: ActivatedRoute,
    title: Title,
    toolbar: ToolbarService
  ) {
    title.setTitle('Rollen und Berechtigungen');
    toolbar.title = 'Rollen und Berechtigungen';
    toolbar.navigateBackUri = null;

    const roles$ = this._route.data.pipe(map(data => data.roles as Role[]));
    const hotRoles$ = this._roleService.getAll().pipe(
      skip(1)
    );
    this.roles$ = merge(roles$, hotRoles$);
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
      this._router.navigate([$key], { relativeTo: this._route });
    }
  }

  async edit(prev: Role) {
    const dialogRef = this._dialog.open<EditRoleDialogComponent, any, Role>(EditRoleDialogComponent, {
      minWidth: '300px',
      maxWidth: '450px',
      data: prev,
      disableClose: true
    });

    const updated = await dialogRef.beforeClose().toPromise();

    if (updated) {
      await this._roleService.update(prev.$key, updated);
    }
  }

  async delete(role: Role) {
    const dialogRef = this._dialog.open<ConfirmDialogComponent, ConfirmDialogData, Role>(ConfirmDialogComponent, {
      data: { title: 'Bist du sicher?', text: `Möchtest du die Rolle "${role.name}" wirklich endgültig löschen?` },
      disableClose: true,
      minWidth: '300px',
      maxWidth: '450px'
    });

    const confirmed = await dialogRef.beforeClose().toPromise();

    if (confirmed) {
      await this._roleService.delete(role.$key);
    }
  }
}
