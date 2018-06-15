import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

import { DataAccessModule } from '../../../shared/data-access/data-access.module';
import { LayoutModule } from '../../../shared/layout/layout.module';
import { PermissionsPageRoutingModule } from './permissions-page-routing.module';
import { PermissionsPageComponent } from './permissions-page.component';
import { RoleCardComponent } from './role-card/role-card.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    PermissionsPageRoutingModule,
    FlexLayoutModule,

    // Material
    MatButtonModule,
    MatCardModule,

    // Custom
    DataAccessModule,
    LayoutModule
  ],
  declarations: [PermissionsPageComponent, RoleCardComponent]
})
export class PermissionsPageModule { }
