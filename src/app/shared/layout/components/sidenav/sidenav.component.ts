import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, ViewChild, OnChanges } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../data-access/models/user';
import { RoleService } from '../../../data-access/services/role.service';

@Component({
  selector: 'knnl-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements OnChanges, OnDestroy {
  private _subscriptions: Subscription[] = [];
  mode: 'over' | 'push' | 'side' = 'side';
  opened = true;

  protected viewAdministration$: Observable<boolean>;
  protected viewRoles$: Observable<boolean>;
  protected viewUsers$: Observable<boolean>;
  protected viewNews$: Observable<boolean>;

  @ViewChild(MatSidenav) sidenav: MatSidenav;
  @Input('knnl-user') user: User;

  constructor(
    private _authService: AuthService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _roleService: RoleService,
    private _router: Router,
    breakpointObserver: BreakpointObserver
  ) {
    // Close sidenav on small screens after navigating
    this._subscriptions.push(
      _router.events.pipe(
        filter(e => e instanceof NavigationEnd), // only on routing
        filter(e => this.mode === 'over'), // only on smalls screens
        tap(() => this.sidenav.close()),
        tap(() => this._changeDetectorRef.markForCheck())
      ).subscribe()
    );

    // subscribe event which will be triggered every time, the screen-size switches between small and large
    this._subscriptions.push(
      breakpointObserver.observe('(max-width: 959px)').pipe(
        map(state => state.matches),
        distinctUntilChanged(),
        tap(isSmall => this.screenSizeChanged(isSmall))
      ).subscribe()
    );
  }

  ngOnChanges() {
    if (this.user) {
      this.viewAdministration$ = this._roleService.hasPermission(this.user.uid, 'administration_view');
      this.viewRoles$ = this._roleService.hasPermission(this.user.uid, 'roles_view');
      this.viewUsers$ = this._roleService.hasPermission(this.user.uid, 'users_view');
      this.viewNews$ = this._roleService.hasPermission(this.user.uid, 'news_view');
    }
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  async logout() {
    await this._authService.logout();
    this._router.navigateByUrl('/login');
  }

  toggle() {
    this.sidenav.toggle();
    this._changeDetectorRef.markForCheck();
  }

  private screenSizeChanged(isSmall: boolean) {
    if (isSmall) {
      this.opened = false;
      this.mode = 'over';
    } else {
      this.opened = true;
      this.mode = 'side';
    }
    this._changeDetectorRef.markForCheck();
  }

}
