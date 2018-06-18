import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DataAccessModule } from '../../../shared/data-access/data-access.module';
import { LayoutModule } from '../../../shared/layout/layout.module';
import { UserModule } from '../../../shared/user/user.module';
import { UserDetailPageRoutingModule } from './user-detail-page-routing.module';
import { UserDetailPageComponent } from './user-detail-page.component';

@NgModule({
  imports: [
    CommonModule,
    UserDetailPageRoutingModule,

    // Custom
    DataAccessModule,
    LayoutModule,
    UserModule
  ],
  declarations: [UserDetailPageComponent]
})
export class UserDetailPageModule { }
