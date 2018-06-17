import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../data-access/models/user';
import { UserService } from '../../../data-access/services/user.service';

@Component({
  selector: 'knnl-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoggedInComponent {
  user$: Observable<User>;

  constructor(
    private _authService: AuthService,
    private _userService: UserService
  ) {
    this.user$ = this._authService.authState$.pipe(
      switchMap(user => !user ? of(null) : this._userService.getByUid(user.uid))
    );
  }
}
