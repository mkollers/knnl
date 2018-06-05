import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    // AngularFire
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  declarations: []
})
export class AuthModule { }
