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
import { RoleCardComponent } from './components/role-card/role-card.component';
import { CreateRoleDialogComponent } from './dialogs/create-role-dialog/create-role-dialog.component';

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
    MatInputModule
  ],
  declarations: [
    CreateRoleDialogComponent,
    RoleCardComponent
  ],
  entryComponents: [
    CreateRoleDialogComponent
  ],
  exports: [
    RoleCardComponent
  ]
})
export class RoleModule { }
