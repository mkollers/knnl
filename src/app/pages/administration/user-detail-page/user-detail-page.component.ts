import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { map, skip, switchMap, tap } from 'rxjs/operators';

import { Role } from '../../../shared/data-access/models/role';
import { User } from '../../../shared/data-access/models/user';
import { RoleService } from '../../../shared/data-access/services/role.service';
import { UserService } from '../../../shared/data-access/services/user.service';
import { ToolbarService } from '../../../shared/layout/services/toolbar.service';
import { NotificationService } from '../../../shared/notification/services/notification.service';

@Component({
  selector: 'knnl-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailPageComponent {
  user$: Observable<User>;
  roles$: Observable<Role[]>;

  constructor(
    private _notificationService: NotificationService,
    private _userService: UserService,
    roleService: RoleService,
    route: ActivatedRoute,
    router: Router,
    title: Title,
    toolbar: ToolbarService
  ) {
    const user$ = route.data.pipe(map(data => data.user as User));
    const uid$ = route.params.pipe(map(params => params['uid']));
    const hotUser$ = uid$.pipe(
      switchMap(uid => this._userService.getByUid(uid)),
      skip(1)
    );

    this.user$ = merge(user$, hotUser$).pipe(
      tap(user => toolbar.title = `${user.firstname} ${user.lastname}`),
      tap(user => title.setTitle(`${user.firstname} ${user.lastname}`))
    );
    this.roles$ = roleService.getAll();

    const urlTree = router.createUrlTree(['../'], { relativeTo: route.parent });
    toolbar.navigateBackUri = urlTree.toString();
  }

  protected async assignRole(role: Role, user: User) {
    try {
      await this._userService.assignRole(user.uid, role.$key);
    } catch (err) {
      this._notificationService.fatal(err);
    }
  }

  protected async unassignRole(role: Role, user: User) {
    try {
      await this._userService.unassignRole(user.uid, role.$key);
    } catch (err) {
      this._notificationService.fatal(err);
    }
  }
}
