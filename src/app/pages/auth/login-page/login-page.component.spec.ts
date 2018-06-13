import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/auth/services/auth.service';
import { NotificationService } from '../../../shared/notification/services/notification.service';
import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [LoginPageComponent],
      providers: [
        {
          provide: AuthService, useValue: {
            login: () => { }
          }
        },
        {
          provide: NotificationService, useValue: {
            error: () => { },
            fatal: () => { }
          }
        },
        {
          provide: Router, useValue: {
            navigateByUrl: () => { }
          }
        },
        {
          provide: Title, useValue: {
            setTitle: () => { }
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('# login', () => {
    let authService: AuthService;
    let notificationService: NotificationService;
    let router: Router;

    beforeEach(() => {
      authService = TestBed.get(AuthService);
      notificationService = TestBed.get(NotificationService);
      router = TestBed.get(Router);
    });

    function fillAndSubmitForm(email: string, password: string) {
      const emailInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('input[type=email]');
      const passwordInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('input[type=password]');
      const loginButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('button[type=submit]');

      emailInput.value = email;
      emailInput.dispatchEvent(new Event('input'));
      passwordInput.value = password;
      passwordInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      loginButton.click();
    }

    it('with email and password', async () => {
      spyOn(authService, 'login').and.returnValue(Promise.resolve());
      spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve());

      await fixture.whenRenderingDone();
      fillAndSubmitForm('h.simpson@knnl.de', '1L0v3D0nuts');
      await fixture.whenStable();

      expect(authService.login).toHaveBeenCalledWith('h.simpson@knnl.de', '1L0v3D0nuts');
      expect(router.navigateByUrl).toHaveBeenCalledWith('/');
    });

    it('with unknown email', async () => {
      spyOn(authService, 'login').and.returnValue(Promise.reject({ code: 'auth/user-not-found' }));
      spyOn(notificationService, 'error').and.callFake(() => { });

      await fixture.whenRenderingDone();
      fillAndSubmitForm('h.simpson@knnl.de', '1L0v3D0nuts');
      await fixture.whenStable();

      expect(notificationService.error).toHaveBeenCalledWith('Unbekannter Nutzer', 'Diese E-Mail Adresse ist uns leider nicht bekannt.');
    });

    it('with unknown error', async () => {
      spyOn(authService, 'login').and.returnValue(Promise.reject('Kapppuuuuuut'));
      spyOn(notificationService, 'fatal').and.callFake(() => { });

      await fixture.whenRenderingDone();
      fillAndSubmitForm('h.simpson@knnl.de', '1L0v3D0nuts');
      await fixture.whenStable();

      expect(notificationService.fatal).toHaveBeenCalledWith('Kapppuuuuuut');
    });
  });
});
