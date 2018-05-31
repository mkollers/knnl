import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NotificationComponent } from './components/notification/notification.component';
import { NotificationService } from './services/notification.service';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,

    // Material
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [NotificationService],
  declarations: [NotificationComponent],
  exports: [NotificationComponent],
  entryComponents: [NotificationComponent]
})
export class NotificationModule { }
