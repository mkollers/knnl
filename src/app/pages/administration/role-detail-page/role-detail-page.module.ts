import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DataAccessModule } from '../../../shared/data-access/data-access.module';
import { LayoutModule } from '../../../shared/layout/layout.module';
import { RoleModule } from '../../../shared/role/role.module';
import { RoleDetailPageRoutingModule } from './role-detail-page-routing.module';
import { RoleDetailPageComponent } from './role-detail-page.component';

@NgModule({
  imports: [
    CommonModule,
    RoleDetailPageRoutingModule,
    FlexLayoutModule,

    // Custom
    DataAccessModule,
    LayoutModule,
    RoleModule
  ],
  declarations: [RoleDetailPageComponent]
})
export class RoleDetailPageModule { }
