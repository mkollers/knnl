import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../../data-access/models/user';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoggedInComponent {
  user: User;

  constructor(
    route: ActivatedRoute
  ) {
    this.user = route.snapshot.data['currentUser'];
  }
}
