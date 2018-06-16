import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';

import { Role } from '../../../data-access/models/role';
import { PermissionChange } from './permission-change';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleDetailsComponent {
  @Input('knnl-role') role: Role;
  @Output('knnl-permission-change') permissionChange = new EventEmitter<PermissionChange>();

  constructor() { }

  change($event: MatSlideToggleChange) {
    this.permissionChange.emit({ permission: $event.source.id, selected: $event.checked });
  }
}
