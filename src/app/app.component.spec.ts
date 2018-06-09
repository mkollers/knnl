import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { of as observableOf, of, Subject } from 'rxjs';
import { Mock } from 'ts-mocks/lib';

import { AppComponent } from './app.component';
import { AuthService } from './shared/auth/services/auth.service';
import { UserService } from './shared/data-access/services/user.service';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  // Mocks
  let authServiceMock: Mock<AuthService>;
  let domSanitizerMock: Mock<DomSanitizer>;
  let iconRegistryMock: Mock<MatIconRegistry>;
  let userServiceMock: Mock<UserService>;

  // Data
  const authState$ = new Subject();

  beforeEach(async(() => {
    authServiceMock = new Mock<AuthService>({ authState$: authState$ });
    domSanitizerMock = new Mock<DomSanitizer>({ bypassSecurityTrustResourceUrl: () => { } });
    iconRegistryMock = new Mock<MatIconRegistry>({ addSvgIconInNamespace: () => { } });
    userServiceMock = new Mock<UserService>({ getByEmail: () => observableOf(null) });

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock.Object },
        { provide: DomSanitizer, useValue: domSanitizerMock.Object },
        { provide: MatIconRegistry, useValue: iconRegistryMock.Object },
        { provide: UserService, useValue: userServiceMock.Object }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    tick();
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should load user from userService', () => {
    // Arrange
    const userService = TestBed.get(UserService);
    userServiceMock.setup(u => u.getByEmail).is(() => of(null));

    // Act
    authState$.next({ email: 'captain@america.com' });

    // Assert
    expect(userService.getByEmail).toHaveBeenCalledWith('captain@america.com');
  });

  it('should not call userService because of empty auth state', () => {
    // Arrange
    const userService = TestBed.get(UserService);
    userServiceMock.setup(u => u.getByEmail).is(() => of(null));

    // Act
    authState$.next(null);

    // Assert
    expect(userService.getByEmail).not.toHaveBeenCalled();
  });
});
