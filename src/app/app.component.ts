import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap, map, filter, delay, debounce } from 'rxjs/operators';

import { AuthService } from './shared/auth/services/auth.service';
import { User } from './shared/data-access/models/user';
import { UserService } from './shared/data-access/services/user.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  isRouting$: Observable<boolean>;
  user$: Observable<User>;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _iconRegistry: MatIconRegistry,
    private _sanitizer: DomSanitizer,
    authService: AuthService,
    router: Router,
    userService: UserService
  ) {
    this.registerIcons();
    this.user$ = authService.authState$.pipe(
      switchMap(user => !user ? of(null) : userService.getByUid(user.uid))
    );

    this.isRouting$ = router.events.pipe(
      filter(event => event instanceof NavigationStart || event instanceof NavigationEnd),
      map(event => {
        if (event instanceof NavigationStart) {
          return true;
        } else if (event instanceof NavigationEnd) {
          return false;
        }
        this._changeDetectorRef.markForCheck();
      })
    );
  }

  /** Registers all required svg-icons for the whole application */
  private registerIcons() {
    // Material icons
    this.registerIcon('material', 'outline-arrow_back');
    this.registerIcon('material', 'outline-close');
    this.registerIcon('material', 'outline-done_all');
    this.registerIcon('material', 'outline-edit');
    this.registerIcon('material', 'outline-menu');
    this.registerIcon('material', 'outline-whatshot');
  }

  /** Registers one icon for a namespace. Requires the svg to be under "assets/icons/${namespace}/${name}.svg" */
  private registerIcon(namespace: string, name: string) {
    const url = `assets/icons/${namespace}/${name}.svg`;
    this._iconRegistry.addSvgIconInNamespace(namespace, name, this._sanitizer.bypassSecurityTrustResourceUrl(url));
  }
}
