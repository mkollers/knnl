import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { DataAccessModule } from '../../../shared/data-access/data-access.module';
import { LayoutModule } from '../../../shared/layout/layout.module';
import { RoleModule } from '../../../shared/role/role.module';
import { RoleListPageRoutingModule } from './role-list-page-routing.module';
import { RoleListPageComponent } from './role-list-page.component';

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
    DataAccessModule,
    LayoutModule,
    RoleModule
  ],
  declarations: [
    RoleListPageComponent
  ]
})
export class RoleListPageModule { }
