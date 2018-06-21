import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { chain, Dictionary } from 'lodash';

import { Role } from '../../../data-access/models/role';
import { User } from '../../../data-access/models/user';

@Component({
  selector: 'knnl-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent implements OnChanges {
  @Input('knnl-user') user: User;
  @Input('knnl-roles') roles: Role[];
  protected selectedRoles: Dictionary<boolean>;

  constructor() { }

  ngOnChanges() {
    if (this.roles && this.user) {
      this.selectedRoles = chain(this.user.roles).keyBy().mapValues(x => true).value();
    }
  }
}
