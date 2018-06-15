import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { RolesResolver } from './resolvers/roles.resolver';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,

    // AngularFire
    AngularFireDatabaseModule
  ],
  providers: [
    UserService,
    RolesResolver
  ],
  declarations: []
})
export class DataAccessModule { }
