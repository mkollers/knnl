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

  it('should create an instance with forRoot() and inlcude AuthService', () => {
    const mod = AuthModule.forRoot();
    const includes = mod.providers.includes(AuthService);

    expect(includes).toBeTruthy();
  });
});
