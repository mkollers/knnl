import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../../shared/data-access/models/user';
import { UserService } from '../../../shared/data-access/services/user.service';

@Component({
  selector: 'knnl-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.css']
})
export class UserListPageComponent {
  users$: Observable<User[]>;

  constructor(userService: UserService) {
    this.users$ = userService.getAll();
  }
}
