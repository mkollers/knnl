import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { skip, tap } from 'rxjs/operators';

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
export class RoleListPageComponent implements OnDestroy {
  private _subscriptions: Subscription[] = [];
  roles$ = new BehaviorSubject<Role[]>(null);

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

    this.roles$.pipe(tap(console.log));
    this.roles$.next(this._route.snapshot.data.roles);

    // this._changeDetectorRef.markForCheck();
    this._subscriptions.push(
      this._roleService.getAll().pipe(
        skip(1),
        tap(roles => this.roles$.next(roles))
      ).subscribe()
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
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
