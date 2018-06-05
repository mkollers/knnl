import { Component, OnInit } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';

import { AuthService } from '../../../shared/auth/services/auth.service';
import { UserService } from '../../../shared/data-access/services/user.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent {

  constructor() { }
}
