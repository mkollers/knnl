import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DataAccessModule } from '../../../shared/data-access/data-access.module';
import { LayoutModule } from '../../../shared/layout/layout.module';
import { NotificationModule } from '../../../shared/notification/notification.module';
import { UserModule } from '../../../shared/user/user.module';
import { UserDetailPageRoutingModule } from './user-detail-page-routing.module';
import { UserDetailPageComponent } from './user-detail-page.component';

@NgModule({
  imports: [
    CommonModule,
    UserDetailPageRoutingModule,
    FlexLayoutModule,

    // Custom
    DataAccessModule,
    LayoutModule,
    NotificationModule,
    UserModule
  ],
  declarations: [UserDetailPageComponent]
})
export class UserDetailPageModule { }
