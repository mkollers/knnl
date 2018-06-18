import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DataAccessModule } from '../../../shared/data-access/data-access.module';
import { UserModule } from '../../../shared/user/user.module';
import { UserListPageRoutingModule } from './user-list-page-routing.module';
import { UserListPageComponent } from './user-list-page.component';

@NgModule({
  imports: [
    CommonModule,
    UserListPageRoutingModule,

    // Custom
    DataAccessModule,
    UserModule
  ],
  declarations: [UserListPageComponent]
})
export class UserListPageModule { }
