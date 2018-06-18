import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListPageRoutingModule } from './user-list-page-routing.module';
import { UserListPageComponent } from './user-list-page.component';

@NgModule({
  imports: [
    CommonModule,
    UserListPageRoutingModule
  ],
  declarations: [UserListPageComponent]
})
export class UserListPageModule { }
