import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';

import { AuthModule } from '../../../shared/auth/auth.module';
import { DataAccessModule } from '../../../shared/data-access/data-access.module';
import { LayoutModule } from '../../../shared/layout/layout.module';
import { NotificationModule } from '../../../shared/notification/notification.module';
import { RegisterPageRoutingModule } from './register-page-routing.module';
import { RegisterPageComponent } from './register-page.component';

@NgModule({
  imports: [
    CommonModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    // Material
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatMomentDateModule,
    MatStepperModule,

    // Custom
    AuthModule,
    DataAccessModule,
    LayoutModule,
    NotificationModule
  ],
  declarations: [RegisterPageComponent],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' }
  ]
})
export class RegisterPageModule { }
