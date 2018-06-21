import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Role } from '../../../data-access/models/role';
import { User } from '../../../data-access/models/user';

@Component({
  selector: 'knnl-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent {
  @Input('knnl-user') user: User;
  @Input('knnl-roles') roles: Role[];
  @Output('knnl-assign-role') assignRole = new EventEmitter<Role>();
  @Output('knnl-unassign-role') unassignRole = new EventEmitter<Role>();

  constructor() { }

  protected onRoleCheck(role: Role, checked: boolean) {
    if (checked) {
      this.assignRole.emit(role);
    } else {
      this.unassignRole.emit(role);
    }
  }
}
