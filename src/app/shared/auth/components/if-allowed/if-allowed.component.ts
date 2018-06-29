import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'knnl-if-allowed',
  templateUrl: './if-allowed.component.html',
  styleUrls: ['./if-allowed.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IfAllowedComponent implements OnChanges {
  @Input('knnl-permission') permission: string | string[];
  @Input('knnl-operator') operator: 'OR' | 'AND' = 'AND';

  protected isAllowed$: Observable<boolean>;

  constructor(
    private _authService: AuthService
  ) { }

  ngOnChanges() {
    if (!!this.permission) {
      this.isAllowed$ = this._authService.claims$.pipe(
        map(claims => {
          // single permission
          if (typeof this.permission === 'string') {
            return claims[this.permission];
          }

          // multiple permission
          if (this.operator === 'OR') {
            return _.some(this.permission, p => claims[p]);
          } else {
            return _.every(this.permission, p => claims[p]);
          }
        })
      );
    }
  }

}
