import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AuthModule } from '../../shared/auth/auth.module';
import { NotificationModule } from '../../shared/notification/notification.module';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page.component';

@NgModule({
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,

    // Material
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,

    // Custom
    AuthModule,
    NotificationModule
  ],
  declarations: [LoginPageComponent]
})
export class LoginPageModule { }
