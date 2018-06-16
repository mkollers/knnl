import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,

    // AngularFire
    AngularFireDatabaseModule
  ],
  providers: [
    UserService,
    RoleService
  ],
  declarations: []
})
export class DataAccessModule { }
