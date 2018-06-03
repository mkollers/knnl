import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material';
import { Title } from '@angular/platform-browser';
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
        ReactiveFormsModule,
        MatCheckboxModule // Required to fix reactive forms binding
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
        { provide: NotificationService, useValue: {} },
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
      const firstnameInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('input.email');
      const lastnameInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('input.password');
      const nextButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('button.submit-personal');

      firstnameInput.value = firstname;
      firstnameInput.dispatchEvent(new Event('input'));
      lastnameInput.value = lastname;
      lastnameInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      nextButton.click();
    }

    function fillDataProtectionFormAndSubmit() {
      const finishButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('button.submit-data-prot');
      finishButton.click();
    }

    it('successfull', async () => {
      spyOn(authService, 'register').and.returnValue(Promise.resolve());
      spyOn(authService, 'setPersonalData').and.returnValue(Promise.resolve());
      spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve());

      await fixture.whenRenderingDone();
      fillAccountFormAndSubmit('h.simpson@knnl.de', '1L0v3D0nuts');
      await fixture.whenStable();
      fillPersonalFormAndSubmit('Homer', 'Simpson');
      await fixture.whenStable();
      fillDataProtectionFormAndSubmit();
      await fixture.whenStable();

      expect(authService.register).toHaveBeenCalledWith('h.simpson@knnl.de', '1L0v3D0nuts');
      expect(authService.setPersonalData).toHaveBeenCalledWith({ firstname: 'Homer', lastname: 'Simpson' });
      expect(router.navigateByUrl).toHaveBeenCalledWith('/');
    });
  });
});
