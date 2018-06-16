import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { DataAccessModule } from '../../../shared/data-access/data-access.module';
import { LayoutModule } from '../../../shared/layout/layout.module';
import { RoleModule } from '../../../shared/role/role.module';
import { PermissionsPageRoutingModule } from './permissions-page-routing.module';
import { PermissionsPageComponent } from './permissions-page.component';
import { RolesResolver } from './roles.resolver';

@NgModule({
  imports: [
    CommonModule,
    PermissionsPageRoutingModule,
    FlexLayoutModule,

    // Material
    MatButtonModule,
    MatDialogModule,
    MatIconModule,

    // Custom
    DataAccessModule,
    LayoutModule,
    RoleModule
  ],
  declarations: [
    PermissionsPageComponent
  ], providers: [
    RolesResolver
  ]
})
export class PermissionsPageModule { }
