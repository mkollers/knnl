import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationEnd, Router } from '@angular/router';
import { of as observableOf, Subject } from 'rxjs';
import { Mock } from 'ts-mocks/lib';

import { AuthService } from '../../../auth/services/auth.service';
import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  // Mocks
  let authServiceMock: Mock<AuthService>;
  let breakpointObserverMock: Mock<BreakpointObserver>;
  let routerMock: Mock<Router>;

  // Data
  const events$ = new Subject();
  const breakpointState$ = new Subject<BreakpointState>();

  beforeEach(async(() => {
    authServiceMock = new Mock<AuthService>({ authState$: observableOf({ email: 'captain@america.com' }), logout: () => { } });
    breakpointObserverMock = new Mock<BreakpointObserver>({ observe: () => breakpointState$ });
    routerMock = new Mock<Router>({ events: events$, navigateByUrl: () => { } });

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatSidenavModule
      ],
      declarations: [SidenavComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock.Object },
        { provide: BreakpointObserver, useValue: breakpointObserverMock.Object },
        { provide: Router, useValue: routerMock.Object }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close sidenav', () => {
    // Arrange
    component.mode = 'over';
    spyOn(component.sidenav, 'close').and.returnValue(Promise.resolve());

    // Act
    events$.next(new NavigationEnd(42, '/Schnitzel', '/Schnitzel/42'));

    // Assert
    expect(component.sidenav.close).toHaveBeenCalledTimes(1);
  });

  it('should logout', async () => {
    // Arrange
    const authService = TestBed.get(AuthService);
    const router = TestBed.get(Router);

    authServiceMock.setup(a => a.logout).is(() => Promise.resolve());
    routerMock.setup(r => r.navigateByUrl).is(() => Promise.resolve(true));

    // Act
    await component.logout();

    // Assert
    expect(authService.logout).toHaveBeenCalledTimes(1);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should toggle sidenav', async () => {
    // Arrange
    spyOn(component.sidenav, 'toggle').and.returnValue(Promise.resolve());

    // Act
    component.toggle();

    // Assert
    expect(component.sidenav.toggle).toHaveBeenCalledTimes(1);
  });

  it('should close sidenav and change mode to over on small screens', () => {
    // Act
    breakpointState$.next({ matches: true });

    // Assert
    expect(component.opened).toBe(false);
    expect(component.mode).toBe('over');
  });

  it('should show sidenav and change mode to side on large screens', () => {
    // Act
    breakpointState$.next({ matches: false });

    // Assert
    expect(component.opened).toBe(true);
    expect(component.mode).toBe('side');
  });
});
