import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { Role } from '../../../shared/data-access/models/role';
import { RoleService } from '../../../shared/data-access/services/role.service';
import { ToolbarService } from '../../../shared/layout/services/toolbar.service';

@Component({
  selector: 'app-permissions-page',
  templateUrl: './permissions-page.component.html',
  styleUrls: ['./permissions-page.component.css']
})
export class PermissionsPageComponent {
  roles$: Observable<Role[]>;

  constructor(
    roleService: RoleService,
    title: Title,
    toolbarService: ToolbarService
  ) {
    title.setTitle('Rollen und Berechtigungen');
    toolbarService.title = 'Rollen und Berechtigungen';

    this.roles$ = roleService.getAll();
  }
}
