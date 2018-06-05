import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs';
import { Mock } from 'ts-mocks';

import { LoggedInGuard } from './logged-in.guard';

describe('LoggedInGuard', () => {
  const authState$ = new Subject();

  // Mocks
  let angularFireAuthMock: Mock<AngularFireAuth>;
  let routerMock: Mock<Router>;

  // Dependencies
  let angularFireAuth: AngularFireAuth;
  let guard: LoggedInGuard;
  let router: Router;

  beforeEach(() => {
    angularFireAuthMock = new Mock<AngularFireAuth>({ authState: authState$ });
    routerMock = new Mock<Router>({ navigateByUrl: () => Mock.ANY_FUNC });

    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireAuth, useValue: angularFireAuthMock.Object },
        { provide: Router, useValue: routerMock.Object },
        LoggedInGuard
      ]
    });
  });

  beforeEach(() => {
    angularFireAuth = TestBed.get(AngularFireAuth);
    guard = TestBed.get(LoggedInGuard);
    router = TestBed.get(Router);
  });

  it('should create guard', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true', async () => {
    const p = guard.canActivate(null, null);
    authState$.next({});
    const result = await p;

    expect(result).toBe(true);
  });

  it('should return false and redirect to login', async () => {
    routerMock.setup(r => r.navigateByUrl).is(() => Promise.resolve(true));

    const p = guard.canActivate(null, null);
    authState$.next(null);
    const result = await p;

    expect(result).toBe(false);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
