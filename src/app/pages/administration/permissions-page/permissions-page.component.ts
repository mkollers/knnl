import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Role } from '../../../shared/data-access/models/role';
import { ToolbarService } from '../../../shared/layout/services/toolbar.service';

@Component({
  selector: 'app-permissions-page',
  templateUrl: './permissions-page.component.html',
  styleUrls: ['./permissions-page.component.css']
})
export class PermissionsPageComponent {
  roles: Role[];

  constructor(
    route: ActivatedRoute,
    title: Title,
    toolbarService: ToolbarService
  ) {
    title.setTitle('Rollen und Berechtigungen');
    toolbarService.title = 'Rollen und Berechtigungen';
    this.roles = route.snapshot.data['roles'];
  }
}
