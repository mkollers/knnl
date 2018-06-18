import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { UserTableComponent } from './components/user-table/user-table.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,

    // Material
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule
  ],
  declarations: [UserTableComponent],
  exports: [
    UserTableComponent
  ]
})
export class UserModule { }
