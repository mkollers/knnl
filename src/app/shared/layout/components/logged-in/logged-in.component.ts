import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../data-access/models/user';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {
  user: User;

  constructor(
    route: ActivatedRoute
  ) {
    this.user = route.snapshot.data['currentUser'];
  }

  ngOnInit() {
  }

}
