import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Role } from '../../../shared/data-access/models/role';
import { RoleService } from '../../../shared/data-access/services/role.service';
import { ConfirmDialogData } from '../../../shared/helpers/dialogs/confirm-dialog/confirm-dialog-data';
import { ConfirmDialogComponent } from '../../../shared/helpers/dialogs/confirm-dialog/confirm-dialog.component';
import { ToolbarService } from '../../../shared/layout/services/toolbar.service';
import { CreateRoleDialogComponent } from '../../../shared/role/dialogs/create-role-dialog/create-role-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'knnl-permissions-page',
  templateUrl: './permissions-page.component.html',
  styleUrls: ['./permissions-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionsPageComponent {
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
    toolbar.navigateBackUri = '';

    this.roles$ = this._roleService.getAll();
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
