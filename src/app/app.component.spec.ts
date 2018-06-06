import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { of as observableOf } from 'rxjs';
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

  beforeEach(async(() => {
    authServiceMock = new Mock<AuthService>({ authState$: observableOf({ email: 'captain@america.com' }) });
    domSanitizerMock = new Mock<DomSanitizer>({ bypassSecurityTrustResourceUrl: () => { } });
    iconRegistryMock = new Mock<MatIconRegistry>({ addSvgIconInNamespace: () => { } });
    userServiceMock = new Mock<UserService>({ getByEmail: () => observableOf(null)});

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
  }));

  it('should create the app', fakeAsync(() => {
    expect(app).toBeTruthy();
  }));
});
