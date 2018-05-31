import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, fakeAsync, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: MatIconRegistry, useValue: jasmine.createSpyObj('MatIconRegistry', ['addSvgIconInNamespace']) },
        { provide: DomSanitizer, useValue: jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustResourceUrl']) }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
