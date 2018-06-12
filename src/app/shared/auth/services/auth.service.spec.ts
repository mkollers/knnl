import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Mock } from 'ts-mocks/lib';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  // Mocks
  let angularFireAuthMock: Mock<AngularFireAuth>;
  let authMock: Mock<firebase.auth.Auth>;

  // Providers
  let service: AuthService;
  let angularFireAuth: AngularFireAuth;

  beforeEach(() => {
    authMock = new Mock<firebase.auth.Auth>({
      currentUser: { email: 'Indiana@Jones.de' },
      createUserWithEmailAndPassword: () => { },
      signInWithEmailAndPassword: () => { },
      signOut: () => Promise.resolve()
    });
    angularFireAuthMock = new Mock<AngularFireAuth>({ auth: authMock.Object });

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: angularFireAuthMock.Object },
      ]
    });
  });

  beforeEach(() => {
    angularFireAuth = TestBed.get(AngularFireAuth);
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an account', async () => {
    authMock.setup(x => x.createUserWithEmailAndPassword).is(() => Promise.resolve());

    await service.register('Indiana@Jones.de', 'SlapMe');

    expect(angularFireAuth.auth.createUserWithEmailAndPassword).toHaveBeenCalledWith('Indiana@Jones.de', 'SlapMe');
  });

  it('should login with email and password', async () => {
    authMock.setup(x => x.signInWithEmailAndPassword).is(() => Promise.resolve());

    await service.login('Indiana@Jones.de', 'SlapMe');

    expect(angularFireAuth.auth.signInWithEmailAndPassword).toHaveBeenCalledWith('Indiana@Jones.de', 'SlapMe');
  });

  it('should signout', async () => {
    authMock.setup(x => x.signOut).is(() => Promise.resolve());

    await service.logout();

    expect(angularFireAuth.auth.signOut).toHaveBeenCalled();
  });
});
