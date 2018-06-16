import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KeysPipe } from './pipes/keys.pipe';
import { NoRoutingDirective } from './directives/no-routing.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    KeysPipe,
    NoRoutingDirective
  ],
  exports: [
    KeysPipe,
    NoRoutingDirective
  ]
})
export class HelpersModule { }
