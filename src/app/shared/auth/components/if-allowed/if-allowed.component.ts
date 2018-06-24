import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { RoleService } from '../../../data-access/services/role.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'knnl-if-allowed',
  templateUrl: './if-allowed.component.html',
  styleUrls: ['./if-allowed.component.css']
})
export class IfAllowedComponent implements OnChanges {
  @Input('knnl-permission') permission: string;

  protected isAllowed$: Observable<boolean>;

  constructor(
    private _authService: AuthService,
    private _roleService: RoleService
  ) { }

  ngOnChanges() {
    if (!!this.permission) {
      this.isAllowed$ = this._authService.authState$.pipe(
        filter(user => !!user),
        map(user => user.uid),
        switchMap(uid => this._roleService.hasPermission(uid, this.permission))
      );
    }
  }

}
