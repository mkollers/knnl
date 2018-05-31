import { fakeAsync } from '@angular/core/testing';

import { AuthModule } from './auth.module';

describe('AuthModule', () => {
  let authModule: AuthModule;

  beforeEach(fakeAsync(() => {
    authModule = new AuthModule();
  }));

  it('should create an instance', () => {
    expect(authModule).toBeTruthy();
  });
});
