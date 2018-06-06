import { BreakpointObserver } from '@angular/cdk/layout';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of as observableOf } from 'rxjs';
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

  beforeEach(async(() => {
    authServiceMock = new Mock<AuthService>({ authState$: observableOf({ email: 'captain@america.com' }) });
    breakpointObserverMock = new Mock<BreakpointObserver>({ observe: () => observableOf({ matches: false }) });
    routerMock = new Mock<Router>({ events: observableOf(null) });

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

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
