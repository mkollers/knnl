import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';

import { ChangeDetectorRefMock } from '../../../../../mocks/change-detector-ref';
import { MatIconRegistryMock } from '../../../../../mocks/mat-icon-registry';
import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule
      ],
      declarations: [NotificationComponent],
      providers: [
        { provide: ChangeDetectorRef, useValue: ChangeDetectorRefMock }, // default value is used anyway
        { provide: MatSnackBarRef, useValue: { containerInstance: { snackBarConfig: { panelClass: 'info' } } } },
        { provide: MatIconRegistry, useValue: MatIconRegistryMock },
        { provide: MAT_SNACK_BAR_DATA, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(() => {
    changeDetectorRef = (component as any)._changeDetectorRef;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#setTitle', () => {
    it('should detect changes', () => {
      spyOn(changeDetectorRef, 'markForCheck');

      component.title = 'test';

      expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
    });
  });

  describe('#setContent', () => {
    it('should detect changes', () => {
      spyOn(changeDetectorRef, 'markForCheck');

      component.content = 'test';

      expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
    });
  });
});
