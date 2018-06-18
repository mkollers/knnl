import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { keyBy } from 'lodash';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RoleService } from '../../../shared/data-access/services/role.service';
import { UserService } from '../../../shared/data-access/services/user.service';
import { ToolbarService } from '../../../shared/layout/services/toolbar.service';
import { UserTableViewModel } from '../../../shared/user/components/user-table/user-table.view-model';

@Component({
  selector: 'knnl-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.css']
})
export class UserListPageComponent {
  data$: Observable<UserTableViewModel[]>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    roleService: RoleService,
    title: Title,
    toolbar: ToolbarService,
    userService: UserService
  ) {
    title.setTitle('Benutzerverwaltung');
    toolbar.title = 'Benutzerverwaltung';
    toolbar.navigateBackUri = null;

    const roles$ = roleService.getAll().pipe(map(roles => keyBy(roles, r => r.$key)));
    const users$ = userService.getAll();
    this.data$ = combineLatest(roles$, users$).pipe(
      map(([roles, users]) => users.map(user => new UserTableViewModel(roles, user)))
    );
  }

  onClick($event: UserTableViewModel) {
    this._router.navigate([$event.uid], { relativeTo: this._route });
  }
}
