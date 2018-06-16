import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Role } from '../../../../shared/data-access/models/role';

@Component({
  selector: 'app-role-card',
  templateUrl: './role-card.component.html',
  styleUrls: ['./role-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleCardComponent {
  @Input('knnl-role') role: Role;

  constructor() { }
}
