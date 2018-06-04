import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatStepperModule } from '@angular/material';
import { By, Title } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/auth/services/auth.service';
import { NotificationService } from '../../shared/notification/services/notification.service';
import { RegisterPageComponent } from './register-page.component';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;

  beforeEach(fakeAsync(() => {
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
        {
          provide: AuthService, useValue: {
            register: () => { },
            setPersonalData: () => { },
            setDataProtection: (key: string, value: boolean) => { }
          }
        },
        {
          provide: NotificationService, useValue: {
            error: () => { },
            fatal: () => { }
          }
        },
        { provide: Router, useValue: { navigateByUrl: () => { } } },
        { provide: Title, useValue: { setTitle: () => { } } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should register', () => {
    let authService: AuthService;
    let notificationService: NotificationService;
    let router: Router;

    beforeEach(() => {
      authService = TestBed.get(AuthService);
      notificationService = TestBed.get(NotificationService);
      router = TestBed.get(Router);
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
      spyOn(authService, 'register').and.returnValue(Promise.resolve());
      spyOn(authService, 'setPersonalData').and.returnValue(Promise.resolve());
      spyOn(authService, 'setDataProtection').and.returnValue(Promise.resolve());
      spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve());

      await fixture.whenRenderingDone();
      fillAccountFormAndSubmit('h.simpson@knnl.de', '1L0v3D0nuts');
      fillPersonalFormAndSubmit('Homer', 'Simpson');
      fillDataProtectionFormAndSubmit(true, false, true, true, true, false);
      await fixture.whenStable();

      expect(authService.register).toHaveBeenCalledWith('h.simpson@knnl.de', '1L0v3D0nuts');
      expect(authService.setPersonalData).toHaveBeenCalledWith({
        dob: '', firstname: 'Homer', lastname: 'Simpson', favoriteTeams: '', interests: '', mobile: ''
      });
      expect(authService.setDataProtection).toHaveBeenCalledWith('news', true);
      expect(authService.setDataProtection).toHaveBeenCalledWith('newPost', false);
      expect(authService.setDataProtection).toHaveBeenCalledWith('reply', true);
      expect(authService.setDataProtection).toHaveBeenCalledWith('results', true);
      expect(authService.setDataProtection).toHaveBeenCalledWith('whatsApp', true);
      expect(authService.setDataProtection).toHaveBeenCalledWith('whatsAppGroup', false);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/');
    });

    it('with duplicate email', async () => {
      spyOn(authService, 'register').and.returnValue(Promise.reject({ code: 'auth/email-already-in-use' }));
      spyOn(notificationService, 'error');

      await fixture.whenRenderingDone();
      fillAccountFormAndSubmit('h.simpson@knnl.de', '1L0v3D0nuts');
      fillPersonalFormAndSubmit('Homer', 'Simpson');
      fillDataProtectionFormAndSubmit(true, false, true, true, true, false);
      await fixture.whenStable();

      // tslint:disable-next-line:max-line-length
      expect(notificationService.error).toHaveBeenCalledWith('Bereits vergeben', 'Diese E-Mail Adresse wird bereits von einem anderen Account verwendet');
    });

    it('with unexpected error', async () => {
      spyOn(authService, 'register').and.throwError('Internet kaputt');
      spyOn(notificationService, 'fatal');

      await fixture.whenRenderingDone();
      fillAccountFormAndSubmit('h.simpson@knnl.de', '1L0v3D0nuts');
      fillPersonalFormAndSubmit('Homer', 'Simpson');
      fillDataProtectionFormAndSubmit(true, false, true, true, true, false);
      await fixture.whenStable();

      expect(notificationService.fatal).toHaveBeenCalledWith(new Error('Internet kaputt'));
    });
  });
});
