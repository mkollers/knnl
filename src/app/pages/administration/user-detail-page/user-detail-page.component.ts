import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { User } from '../../../shared/data-access/models/user';
import { UserService } from '../../../shared/data-access/services/user.service';
import { ToolbarService } from '../../../shared/layout/services/toolbar.service';

@Component({
  selector: 'knnl-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.css']
})
export class UserDetailPageComponent {
  user$: Observable<User>;

  constructor(
    private _userService: UserService,
    route: ActivatedRoute,
    router: Router,
    title: Title,
    toolbar: ToolbarService
  ) {
    const uid$ = route.params.pipe(map(params => params['uid']));
    this.user$ = uid$.pipe(
      switchMap(uid => this._userService.getByUid(uid)),
      tap(user => toolbar.title = `${user.firstname} ${user.lastname}`),
      tap(user => title.setTitle(`${user.firstname} ${user.lastname}`))
    );

    const urlTree = router.createUrlTree(['../'], { relativeTo: route.parent });
    toolbar.navigateBackUri = urlTree.toString();
  }
}
