import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../data-access/models/user';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements OnDestroy {
  private _subscriptions: Subscription[] = [];
  mode: 'over' | 'push' | 'side' = 'side';
  opened = true;

  @ViewChild(MatSidenav) sidenav: MatSidenav;
  @Input('knnl-user') user: User;

  constructor(
    private _authService: AuthService,
    private _changeDetectorRef: ChangeDetectorRef,
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

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  async logout() {
    await this._authService.logout();
    await this._router.navigateByUrl('/login');
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
