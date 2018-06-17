import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { NoRoutingDirective } from './directives/no-routing.directive';
import { KeysPipe } from './pipes/keys.pipe';

@NgModule({
  imports: [
    CommonModule,

    // Material
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  declarations: [
    ConfirmDialogComponent,
    KeysPipe,
    NoRoutingDirective
  ],
  exports: [
    KeysPipe,
    NoRoutingDirective
  ], entryComponents: [
    ConfirmDialogComponent
  ]
})
export class HelpersModule { }
