import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IfAllowedComponent } from './if-allowed.component';

describe('IfAllowedComponent', () => {
  let component: IfAllowedComponent;
  let fixture: ComponentFixture<IfAllowedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IfAllowedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IfAllowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
