import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatStepperModule } from '@angular/material';
import { By, Title } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { Mock } from 'ts-mocks/lib';

import { AuthService } from '../../../shared/auth/services/auth.service';
import { UserService } from '../../../shared/data-access/services/user.service';
import { NotificationService } from '../../../shared/notification/services/notification.service';
import { RegisterPageComponent } from './register-page.component';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;

  // Mocks
  let authServiceMock: Mock<AuthService>;
  let userServiceMock: Mock<UserService>;
  let notificationServiceMock: Mock<NotificationService>;
  let routerMock: Mock<Router>;
  let titleMock: Mock<Title>;

  beforeEach(async(() => {
    authServiceMock = new Mock<AuthService>({ register: () => Promise.resolve()});
    userServiceMock = new Mock<UserService>({
      setPersonalData: () => { },
      setDataProtection: () => { }
    });
    notificationServiceMock = new Mock<NotificationService>({
      error: () => { },
      fatal: () => { }
    });
    routerMock = new Mock<Router>({ navigateByUrl: () => { } });
    titleMock = new Mock<Title>({ setTitle: () => { } });

    authServiceMock.setup(x => x.register).is(() => Promise.resolve());

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,

        // Material
        MatCheckboxModule, // Required to fix reactive forms binding
        MatStepperModule
      ],
      declarations: [RegisterPageComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock.Object },
        { provide: UserService, useValue: userServiceMock.Object },
        { provide: NotificationService, useValue: notificationServiceMock.Object },
        { provide: Router, useValue: routerMock.Object },
        { provide: Title, useValue: titleMock.Object }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should register', () => {
    let authService: AuthService;
    let notificationService: NotificationService;
    let router: Router;
    let userService: UserService;

    beforeEach(() => {
      authService = TestBed.get(AuthService);
      notificationService = TestBed.get(NotificationService);
      router = TestBed.get(Router);
      userService = TestBed.get(UserService);
    });

    function fillAccountFormAndSubmit(email: string, password: string) {
      const emailInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('input.email');
      const passwordInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('input.password');
      const confirmInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('input.confirm');
      const nextButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('button.submit-account');

      emailInput.value = email;
      emailInput.dispatchEvent(new Event('input'));
      passwordInput.value = password;
      passwordInput.dispatchEvent(new Event('input'));
      confirmInput.value = password;
      confirmInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      nextButton.click();
    }

    function fillPersonalFormAndSubmit(firstname: string, lastname: string) {
      const firstnameInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('input.firstname');
      const lastnameInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('input.lastname');
      const nextButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('button.submit-personal');

      firstnameInput.value = firstname;
      firstnameInput.dispatchEvent(new Event('input'));
      lastnameInput.value = lastname;
      lastnameInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      nextButton.click();
    }

    function fillDataProtectionFormAndSubmit(
      news: boolean, newPost: boolean, reply: boolean, results: boolean, whatsApp: boolean, whatsAppGroup: boolean
    ) {
      const newsCheckbox = fixture.debugElement.query(By.css('.mat-checkbox.news input'));
      const newPostCheckbox = fixture.debugElement.query(By.css('.mat-checkbox.new-post input'));
      const replyCheckbox = fixture.debugElement.query(By.css('.mat-checkbox.reply input'));
      const resultsCheckbox = fixture.debugElement.query(By.css('.mat-checkbox.results input'));
      const whatsAppCheckbox = fixture.debugElement.query(By.css('.mat-checkbox.whats-app input'));
      const whatsAppGroupCheckbox = fixture.debugElement.query(By.css('.mat-checkbox.whats-app-group input'));
      const finishButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('button.submit-data-prot');

      if (news) {
        newsCheckbox.nativeElement.click();
      }
      if (newPost) {
        newPostCheckbox.nativeElement.click();
      }
      if (reply) {
        replyCheckbox.nativeElement.click();
      }
      if (results) {
        resultsCheckbox.nativeElement.click();
      }
      if (whatsApp) {
        whatsAppCheckbox.nativeElement.click();
      }
      if (whatsAppGroup) {
        whatsAppGroupCheckbox.nativeElement.click();
      }

      fixture.detectChanges();

      finishButton.click();
    }

    it('successfull', async () => {
      authServiceMock.setup(x => x.register).is(() => Promise.resolve({ user: { uid: 'cqSUnC0IjgQ22GG1bOHVc7EIJD33' } }));
      userServiceMock.setup(x => x.setPersonalData).is(() => Promise.resolve());
      userServiceMock.setup(x => x.setDataProtection).is(() => Promise.resolve());
      routerMock.setup(x => x.navigateByUrl).is(() => Promise.resolve(true));

      await fixture.whenRenderingDone();
      fillAccountFormAndSubmit('h.simpson@knnl.de', '1L0v3D0nuts');
      fillPersonalFormAndSubmit('Homer', 'Simpson');
      fillDataProtectionFormAndSubmit(true, false, true, true, true, false);
      await fixture.whenStable();

      expect(authService.register).toHaveBeenCalledWith('h.simpson@knnl.de', '1L0v3D0nuts');
      expect(userService.setPersonalData).toHaveBeenCalledWith('cqSUnC0IjgQ22GG1bOHVc7EIJD33', {
        email: 'h.simpson@knnl.de', dob: '', firstname: 'Homer', lastname: 'Simpson', favoriteTeams: '', interests: '', mobile: ''
      });
      expect(userService.setDataProtection).toHaveBeenCalledWith('cqSUnC0IjgQ22GG1bOHVc7EIJD33', 'news', true);
      expect(userService.setDataProtection).toHaveBeenCalledWith('cqSUnC0IjgQ22GG1bOHVc7EIJD33', 'newPost', false);
      expect(userService.setDataProtection).toHaveBeenCalledWith('cqSUnC0IjgQ22GG1bOHVc7EIJD33', 'reply', true);
      expect(userService.setDataProtection).toHaveBeenCalledWith('cqSUnC0IjgQ22GG1bOHVc7EIJD33', 'results', true);
      expect(userService.setDataProtection).toHaveBeenCalledWith('cqSUnC0IjgQ22GG1bOHVc7EIJD33', 'whatsApp', true);
      expect(userService.setDataProtection).toHaveBeenCalledWith('cqSUnC0IjgQ22GG1bOHVc7EIJD33', 'whatsAppGroup', false);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/');
    });

    it('with duplicate email', async () => {
      authServiceMock.setup(x => x.register).is(() => Promise.reject({ code: 'auth/email-already-in-use' }));

      await fixture.whenRenderingDone();
      fillAccountFormAndSubmit('h.simpson@knnl.de', '1L0v3D0nuts');
      fillPersonalFormAndSubmit('Homer', 'Simpson');
      fillDataProtectionFormAndSubmit(true, false, true, true, true, false);
      await fixture.whenStable();

      expect(authService.register).toHaveBeenCalledWith('h.simpson@knnl.de', '1L0v3D0nuts');
      // tslint:disable-next-line:max-line-length
      expect(notificationService.error).toHaveBeenCalledWith('Bereits vergeben', 'Diese E-Mail Adresse wird bereits von einem anderen Account verwendet');
    });

    it('with unexpected error', async () => {
      authServiceMock.setup(x => x.register).is(() => Promise.reject(new Error('Internet kaputt')));

      await fixture.whenRenderingDone();
      fillAccountFormAndSubmit('h.simpson@knnl.de', '1L0v3D0nuts');
      fillPersonalFormAndSubmit('Homer', 'Simpson');
      fillDataProtectionFormAndSubmit(true, false, true, true, true, false);
      await fixture.whenStable();

      expect(notificationService.fatal).toHaveBeenCalledWith(new Error('Internet kaputt'));
    });
  });
});
