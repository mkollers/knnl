import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterPageRoutingModule } from './register-page-routing.module';
import { RegisterPageComponent } from './register-page.component';

@NgModule({
  imports: [
    CommonModule,
    RegisterPageRoutingModule
  ],
  declarations: [RegisterPageComponent]
})
export class RegisterPageModule { }
