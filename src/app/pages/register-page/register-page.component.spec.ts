import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material';
import { Title } from '@angular/platform-browser';

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
        { provide: AuthService, useValue: {} },
        { provide: NotificationService, useValue: {} },
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
});
