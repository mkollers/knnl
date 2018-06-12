import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,

    // AngularFire
    AngularFireDatabaseModule
  ],
  providers: [
    UserService
  ],
  declarations: []
})
export class DataAccessModule { }
