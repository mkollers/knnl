import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,

    // AngularFire
    AngularFirestoreModule
  ],
  providers: [
    UserService
  ],
  declarations: []
})
export class DataAccessModule { }
