import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { filter, mapTo, tap } from 'rxjs/operators';

@Component({
  selector: 'knnl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  isRouting$: Observable<boolean>;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _iconRegistry: MatIconRegistry,
    private _sanitizer: DomSanitizer,
    router: Router
  ) {
    this.registerIcons();

    const navigationStart$ = router.events.pipe(
      filter(event => event instanceof NavigationStart),
      mapTo(true)
    );
    const navigationEnd$ = router.events.pipe(
      filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError),
      mapTo(false)
    );
    this.isRouting$ = merge(navigationStart$, navigationEnd$).pipe(
      tap(() => this._changeDetectorRef.markForCheck())
    );
  }

  /** Registers all required svg-icons for the whole application */
  private registerIcons() {
    // Material icons
    this.registerIcon('material', 'outline-add');
    this.registerIcon('material', 'outline-arrow_back');
    this.registerIcon('material', 'outline-close');
    this.registerIcon('material', 'outline-delete');
    this.registerIcon('material', 'outline-done_all');
    this.registerIcon('material', 'outline-edit');
    this.registerIcon('material', 'outline-menu');
    this.registerIcon('material', 'outline-more_vert');
    this.registerIcon('material', 'outline-security');
    this.registerIcon('material', 'outline-supervised_user_circle');
    this.registerIcon('material', 'outline-whatshot');
  }

  /** Registers one icon for a namespace. Requires the svg to be under "assets/icons/${namespace}/${name}.svg" */
  private registerIcon(namespace: string, name: string) {
    const url = `assets/icons/${namespace}/${name}.svg`;
    this._iconRegistry.addSvgIconInNamespace(namespace, name, this._sanitizer.bypassSecurityTrustResourceUrl(url));
  }
}
