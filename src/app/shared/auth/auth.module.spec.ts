import { fakeAsync } from '@angular/core/testing';

import { AuthModule } from './auth.module';
import { AuthService } from './services/auth.service';

describe('AuthModule', () => {
  let authModule: AuthModule;

  beforeEach(fakeAsync(() => {
    authModule = new AuthModule();
  }));

  it('should create an instance', () => {
    expect(authModule).toBeTruthy();
  });
});
