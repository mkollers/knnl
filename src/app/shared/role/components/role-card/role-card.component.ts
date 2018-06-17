import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Role } from '../../../../shared/data-access/models/role';

@Component({
  selector: 'knnl-role-card',
  templateUrl: './role-card.component.html',
  styleUrls: ['./role-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleCardComponent {
  @Input('knnl-role') role: Role;
  @Output('knnl-edit') edit = new EventEmitter<Role>();
  @Output('knnl-delete') delete = new EventEmitter<Role>();

  constructor() { }
}
