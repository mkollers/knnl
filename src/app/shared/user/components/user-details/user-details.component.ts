import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { User } from '../../../data-access/models/user';

@Component({
  selector: 'knnl-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent {
  @Input('knnl-user') user: User;

  constructor() { }

}
