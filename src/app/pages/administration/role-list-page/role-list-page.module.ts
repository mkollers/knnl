import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { AuthModule } from '../../../shared/auth/auth.module';
import { DataAccessModule } from '../../../shared/data-access/data-access.module';
import { LayoutModule } from '../../../shared/layout/layout.module';
import { RoleModule } from '../../../shared/role/role.module';
import { RoleResolver } from '../role-detail-page/role-resolver';
import { RoleListPageRoutingModule } from './role-list-page-routing.module';
import { RoleListPageComponent } from './role-list-page.component';
import { RolesResolver } from './roles-resolver';

@NgModule({
  imports: [
    CommonModule,
    RoleListPageRoutingModule,
    FlexLayoutModule,

    // Material
    MatButtonModule,
    MatDialogModule,
    MatIconModule,

    // Custom
    AuthModule,
    DataAccessModule,
    LayoutModule,
    RoleModule
  ],
  declarations: [
    RoleListPageComponent
  ], providers: [
    RoleResolver,
    RolesResolver
  ]
})
export class RoleListPageModule { }
