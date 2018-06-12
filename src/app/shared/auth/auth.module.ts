import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    // AngularFire
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  declarations: []
})
export class AuthModule { }
