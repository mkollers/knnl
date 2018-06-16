import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { HelpersModule } from '../helpers/helpers.module';
import { RoleCardComponent } from './components/role-card/role-card.component';
import { RoleDetailsComponent } from './components/role-details/role-details.component';
import { CreateRoleDialogComponent } from './dialogs/create-role-dialog/create-role-dialog.component';
import { PermissionPipe } from './pipes/permission.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    // Material
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSlideToggleModule,

    // Custom
    HelpersModule
  ],
  declarations: [
    CreateRoleDialogComponent,
    RoleCardComponent,
    RoleDetailsComponent,
    PermissionPipe
  ],
  entryComponents: [
    CreateRoleDialogComponent
  ],
  exports: [
    RoleCardComponent,
    RoleDetailsComponent
  ]
})
export class RoleModule { }
