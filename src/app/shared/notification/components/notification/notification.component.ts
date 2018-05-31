import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NotificationComponent {
  public state: string;
  private _title: string;
  private _content: string;

  get title() { return this._title; }
  set title(title: string) {
    this._title = title;
    this._changeDetectorRef.markForCheck();
  }
  get content() { return this._content; }
  set content(content: string) {
    this._content = content;
    this._changeDetectorRef.markForCheck();
  }

  constructor(
    public snackBarRef: MatSnackBarRef<NotificationComponent>,
    private _changeDetectorRef: ChangeDetectorRef,
    private _iconRegistry: MatIconRegistry,
    private _sanitizer: DomSanitizer,
    @Inject(MAT_SNACK_BAR_DATA) data: { title: string, content: string }
  ) {
    this.registerIcon('notification', 'success');
    this.registerIcon('notification', 'warning');
    this.registerIcon('notification', 'error');
    this.registerIcon('notification', 'info');

    this.state = this.snackBarRef.containerInstance.snackBarConfig.panelClass.toString();
    this._title = data.title;
    this._content = data.content;
  }

  private registerIcon(namespace: string, name: string) {
    const url = `assets/icons/${namespace}/${name}.svg`;
    this._iconRegistry.addSvgIconInNamespace(namespace, name, this._sanitizer.bypassSecurityTrustResourceUrl(url));
  }
}
