import { Component } from '@angular/core';
import { keyBy } from 'lodash';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RoleService } from '../../../shared/data-access/services/role.service';
import { UserService } from '../../../shared/data-access/services/user.service';
import { UserTableViewModel } from '../../../shared/user/components/user-table/user-table.view-model';

@Component({
  selector: 'knnl-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.css']
})
export class UserListPageComponent {
  data$: Observable<UserTableViewModel[]>;

  constructor(
    roleService: RoleService,
    userService: UserService
  ) {
    const roles$ = roleService.getAll().pipe(map(roles => keyBy(roles, r => r.$key)));
    const users$ = userService.getAll();
    this.data$ = combineLatest(roles$, users$).pipe(
      map(([roles, users]) => users.map(user => new UserTableViewModel(roles, user)))
    );
  }
}
