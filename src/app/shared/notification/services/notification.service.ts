import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NotificationComponent } from '../components/notification/notification.component';
import { ErrorResponse } from '../models/error-response';

@Injectable()
export class NotificationService {

  constructor(private _snackbar: MatSnackBar) { }

  info(title: string, content: string, duration = 10000) {
    const config = { panelClass: 'info', duration: duration, data: { title: title, content: content } };
    return this._snackbar.openFromComponent(NotificationComponent, config);
  }

  warning(title: string, content: string, duration = 10000) {
    const config = { panelClass: 'warning', duration: duration, data: { title: title, content: content } };
    return this._snackbar.openFromComponent(NotificationComponent, config);
  }

  error(title: string, content: string, duration = 20000) {
    const config = { panelClass: 'error', duration: duration, data: { title: title, content: content } };
    return this._snackbar.openFromComponent(NotificationComponent, config);
  }

  fatal(err: ErrorResponse, duration = 20000) {
    console.error(err);
    const config = { panelClass: 'error', duration: duration, data: { title: err.code, content: err.description } };
    return this._snackbar.openFromComponent(NotificationComponent, config);
  }

  success(title: string, content: string, duration = 10000) {
    const config = { panelClass: 'success', duration: duration, data: { title: title, content: content } };
    return this._snackbar.openFromComponent(NotificationComponent, config);
  }

  clear() {
    this._snackbar.dismiss();
  }

}
