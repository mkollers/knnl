import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsPageRoutingModule } from './permissions-page-routing.module';
import { PermissionsPageComponent } from './permissions-page.component';
import { DataAccessModule } from '../../../shared/data-access/data-access.module';
import { LayoutModule } from '../../../shared/layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    PermissionsPageRoutingModule,

    // Custom
    DataAccessModule,
    LayoutModule
  ],
  declarations: [PermissionsPageComponent]
})
export class PermissionsPageModule { }
