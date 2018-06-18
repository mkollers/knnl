import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { Role } from '../../../data-access/models/role';
import { PermissionChange } from './permission-change';

@Component({
  selector: 'knnl-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleDetailsComponent {
  @Input('knnl-role') role: Role;
  @Output('knnl-permission-change') permissionChange = new EventEmitter<PermissionChange>();
  permissions = {
    news: ['news_view'],
    administration: ['administration_view', 'roles_view', 'roles_create', 'roles_edit', 'roles_delete']
  };

  constructor() { }

  change($event: MatSlideToggleChange) {
    this.permissionChange.emit({ permission: $event.source.id, selected: $event.checked });
  }
}
