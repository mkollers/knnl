import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { UserTableComponent } from './components/user-table/user-table.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,

    // Material
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  declarations: [UserTableComponent],
  exports: [
    UserTableComponent
  ]
})
export class UserModule { }