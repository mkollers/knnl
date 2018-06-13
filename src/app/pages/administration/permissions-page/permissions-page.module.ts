import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsPageRoutingModule } from './permissions-page-routing.module';
import { PermissionsPageComponent } from './permissions-page.component';

@NgModule({
  imports: [
    CommonModule,
    PermissionsPageRoutingModule
  ],
  declarations: [PermissionsPageComponent]
})
export class PermissionsPageModule { }
